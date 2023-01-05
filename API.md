# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### BlockchainListener <a name="BlockchainListener" id="@odfdata/blockchain-listener.BlockchainListener"></a>

#### Initializers <a name="Initializers" id="@odfdata/blockchain-listener.BlockchainListener.Initializer"></a>

```typescript
import { BlockchainListener } from '@odfdata/blockchain-listener'

new BlockchainListener(scope: Construct, id: string, props: BlockchainListenerProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@odfdata/blockchain-listener.BlockchainListener.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@odfdata/blockchain-listener.BlockchainListener.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@odfdata/blockchain-listener.BlockchainListener.Initializer.parameter.props">props</a></code> | <code><a href="#@odfdata/blockchain-listener.BlockchainListenerProps">BlockchainListenerProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@odfdata/blockchain-listener.BlockchainListener.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@odfdata/blockchain-listener.BlockchainListener.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@odfdata/blockchain-listener.BlockchainListener.Initializer.parameter.props"></a>

- *Type:* <a href="#@odfdata/blockchain-listener.BlockchainListenerProps">BlockchainListenerProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@odfdata/blockchain-listener.BlockchainListener.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@odfdata/blockchain-listener.BlockchainListener.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@odfdata/blockchain-listener.BlockchainListener.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@odfdata/blockchain-listener.BlockchainListener.isConstruct"></a>

```typescript
import { BlockchainListener } from '@odfdata/blockchain-listener'

BlockchainListener.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@odfdata/blockchain-listener.BlockchainListener.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@odfdata/blockchain-listener.BlockchainListener.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@odfdata/blockchain-listener.BlockchainListener.property.ecsLogGroup">ecsLogGroup</a></code> | <code>aws-cdk-lib.aws_logs.LogGroup</code> | The AWS LogGroup the ECS Fargate Task will write logs in. |
| <code><a href="#@odfdata/blockchain-listener.BlockchainListener.property.ecsTaskDefinitionIAMRole">ecsTaskDefinitionIAMRole</a></code> | <code>aws-cdk-lib.aws_iam.Role</code> | The AWS IAM Role used by the ECS Fargate Task while running. |
| <code><a href="#@odfdata/blockchain-listener.BlockchainListener.property.eventBus">eventBus</a></code> | <code>aws-cdk-lib.aws_events.EventBus</code> | The AWS EventBus you can use to send events to. |
| <code><a href="#@odfdata/blockchain-listener.BlockchainListener.property.securityGroup">securityGroup</a></code> | <code>aws-cdk-lib.aws_ec2.SecurityGroup</code> | The AWS Security Group created to allow connections just from the inside to the outside. |
| <code><a href="#@odfdata/blockchain-listener.BlockchainListener.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.Vpc</code> | The AWS VPC created for the ECS Cluster. |

---

##### `node`<sup>Required</sup> <a name="node" id="@odfdata/blockchain-listener.BlockchainListener.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `ecsLogGroup`<sup>Required</sup> <a name="ecsLogGroup" id="@odfdata/blockchain-listener.BlockchainListener.property.ecsLogGroup"></a>

```typescript
public readonly ecsLogGroup: LogGroup;
```

- *Type:* aws-cdk-lib.aws_logs.LogGroup

The AWS LogGroup the ECS Fargate Task will write logs in.

---

##### `ecsTaskDefinitionIAMRole`<sup>Required</sup> <a name="ecsTaskDefinitionIAMRole" id="@odfdata/blockchain-listener.BlockchainListener.property.ecsTaskDefinitionIAMRole"></a>

```typescript
public readonly ecsTaskDefinitionIAMRole: Role;
```

- *Type:* aws-cdk-lib.aws_iam.Role

The AWS IAM Role used by the ECS Fargate Task while running.

It's the IAM Role you have to update if you need
to add more permissions to the ECS Fargate Task.

---

##### `eventBus`<sup>Required</sup> <a name="eventBus" id="@odfdata/blockchain-listener.BlockchainListener.property.eventBus"></a>

```typescript
public readonly eventBus: EventBus;
```

- *Type:* aws-cdk-lib.aws_events.EventBus

The AWS EventBus you can use to send events to.

---

##### `securityGroup`<sup>Required</sup> <a name="securityGroup" id="@odfdata/blockchain-listener.BlockchainListener.property.securityGroup"></a>

```typescript
public readonly securityGroup: SecurityGroup;
```

- *Type:* aws-cdk-lib.aws_ec2.SecurityGroup

The AWS Security Group created to allow connections just from the inside to the outside.

---

##### `vpc`<sup>Required</sup> <a name="vpc" id="@odfdata/blockchain-listener.BlockchainListener.property.vpc"></a>

```typescript
public readonly vpc: Vpc;
```

- *Type:* aws-cdk-lib.aws_ec2.Vpc

The AWS VPC created for the ECS Cluster.

---


## Structs <a name="Structs" id="Structs"></a>

### BlockchainListenerProps <a name="BlockchainListenerProps" id="@odfdata/blockchain-listener.BlockchainListenerProps"></a>

It's the Blockchain Listener properties interface.

#### Initializer <a name="Initializer" id="@odfdata/blockchain-listener.BlockchainListenerProps.Initializer"></a>

```typescript
import { BlockchainListenerProps } from '@odfdata/blockchain-listener'

const blockchainListenerProps: BlockchainListenerProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@odfdata/blockchain-listener.BlockchainListenerProps.property.cidrBlock">cidrBlock</a></code> | <code>string</code> | The range of IP addresses in which the ECS Fargate Task will be put in. |
| <code><a href="#@odfdata/blockchain-listener.BlockchainListenerProps.property.containerImageDirectory">containerImageDirectory</a></code> | <code>string</code> | The directory in which the Docker file is placed. |
| <code><a href="#@odfdata/blockchain-listener.BlockchainListenerProps.property.cpuArchitecture">cpuArchitecture</a></code> | <code>aws-cdk-lib.aws_ecs.CpuArchitecture</code> | The CPU architecture you want to use for your Fargate Task. |

---

##### `cidrBlock`<sup>Required</sup> <a name="cidrBlock" id="@odfdata/blockchain-listener.BlockchainListenerProps.property.cidrBlock"></a>

```typescript
public readonly cidrBlock: string;
```

- *Type:* string
- *Default:* 11.1.0.0/24

The range of IP addresses in which the ECS Fargate Task will be put in.

---

##### `containerImageDirectory`<sup>Required</sup> <a name="containerImageDirectory" id="@odfdata/blockchain-listener.BlockchainListenerProps.property.containerImageDirectory"></a>

```typescript
public readonly containerImageDirectory: string;
```

- *Type:* string
- *Default:* src/

The directory in which the Docker file is placed.

---

##### `cpuArchitecture`<sup>Required</sup> <a name="cpuArchitecture" id="@odfdata/blockchain-listener.BlockchainListenerProps.property.cpuArchitecture"></a>

```typescript
public readonly cpuArchitecture: CpuArchitecture;
```

- *Type:* aws-cdk-lib.aws_ecs.CpuArchitecture
- *Default:* aws-cdk-lib.aws_ecs.CpuArchitecture.ARM64

The CPU architecture you want to use for your Fargate Task.

Remember that it needs to be the same one of your building environment (pipeline or local machine)

---



