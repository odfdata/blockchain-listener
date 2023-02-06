import * as path from 'path';
import { aws_ec2 as ec2, aws_ecs as ecs, aws_events as events, aws_logs as logs, RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';

/**
 * It's the Blockchain Listener properties interface.
 */
export interface BlockchainListenerProps {
  /**
   * The range of IP addresses in which the ECS Fargate Task will be put in
   *
   * @default 11.1.0.0/24
   */
  readonly cidrBlock: string;

  /**
   * The CPU architecture you want to use for your Fargate Task.
   *
   * Remember that it needs to be the same one of your building environment (pipeline or local machine)
   *
   * @default aws-cdk-lib.aws_ecs.CpuArchitecture.ARM64
   */
  readonly cpuArchitecture: ecs.CpuArchitecture;

  /**
   * The directory in which the Docker file is placed.
   *
   * @default src/
   */
  readonly containerImageDirectory: string;
}

export class BlockchainListener extends Construct {

  /**
   * The AWS LogGroup the ECS Fargate Task will write logs in
   */
  public readonly ecsLogGroup: logs.LogGroup;

  /**
   * The AWS EventBus you can use to send events to.
   */
  public readonly eventBus: events.EventBus;

  /**
   * The AWS VPC created for the ECS Cluster
   */
  public readonly vpc: ec2.Vpc;

  /**
   * The AWS Security Group created to allow connections just from the inside to the outside
   */
  public readonly securityGroup: ec2.SecurityGroup;

  private readonly ecsCluster: ecs.Cluster;
  private readonly ecsTaskDefinition: ecs.TaskDefinition;
  /**
   * The blockchain listener docker container. It gives you the control to set environment variables, if it's necessary
   */
  public readonly blockchainListenerContainer: ecs.ContainerDefinition;

  constructor(scope: Construct, id: string, props: BlockchainListenerProps) {
    super(scope, id);
    // create a new Event Bridge Bus in which the ECS container is allowed to send events
    this.eventBus = new events.EventBus(
      this,
      'EventBus',
      {},
    );
    this.ecsLogGroup = new logs.LogGroup(
      this,
      'LogGroup',
      {
        retention: logs.RetentionDays.TWO_WEEKS,
        removalPolicy: RemovalPolicy.DESTROY,
      },
    );
    // TODO: create vpc optional
    this.vpc = new ec2.Vpc(
      this,
      'VPC',
      {
        natGateways: 0,
        natGatewayProvider: undefined,
        ipAddresses: ec2.IpAddresses.cidr(props.cidrBlock),
      },
    );
    this.securityGroup = new ec2.SecurityGroup(
      this,
      'SecurityGroup',
      {
        vpc: this.vpc,
        description: 'Security group used by the Blockchain Listener',
        allowAllOutbound: true,
      },
    );

    // create the cluster in which the fargate task will run in
    this.ecsCluster = new ecs.Cluster(
      this,
      'ECSCluster',
      {
        enableFargateCapacityProviders: true,
        containerInsights: false,
        vpc: this.vpc,
      },
    );
    // the ecs task definition containing cpu architecture, cpu and memory
    this.ecsTaskDefinition = new ecs.TaskDefinition(
      this,
      'ECSTaskDefinition',
      {
        cpu: '256',
        memoryMiB: '512',
        runtimePlatform: {
          cpuArchitecture: props.cpuArchitecture,
          operatingSystemFamily: ecs.OperatingSystemFamily.LINUX,
        },
        compatibility: ecs.Compatibility.FARGATE,
        networkMode: ecs.NetworkMode.AWS_VPC,
      },
    );
    // add the container with the docker image built locally
    this.blockchainListenerContainer = this.ecsTaskDefinition.addContainer(
      'ECSTaskDefinitionContainer',
      {
        image: ecs.ContainerImage.fromAsset(path.resolve(__dirname, props.containerImageDirectory)),
        logging: ecs.LogDriver.awsLogs({ logGroup: this.ecsLogGroup, streamPrefix: 'ecs' }),
      },
    );
    this.blockchainListenerContainer.addEnvironment(
      'BLOCKCHAIN_LISTENER_EVENT_BRIDGE_BUS_ARN', this.eventBus.eventBusArn);
    this.eventBus.grantPutEventsTo(this.ecsTaskDefinition.taskRole);
    // create a new ecs service to keep 1 instance always running
    new ecs.FargateService(
      this,
      'ECSService',
      {
        cluster: this.ecsCluster,
        taskDefinition: this.ecsTaskDefinition,
        desiredCount: 1,
        platformVersion: ecs.FargatePlatformVersion.LATEST,
        assignPublicIp: true,
        minHealthyPercent: 100,
        maxHealthyPercent: 200,
        vpcSubnets: {
          subnets: this.vpc.publicSubnets,
          onePerAz: true,
        },
        securityGroups: [
          this.securityGroup,
        ],
      },
    );
  }
}
