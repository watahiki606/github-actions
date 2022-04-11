import { Construct } from 'constructs';
import { Stack, aws_lambda as lambda, aws_iam as iam, Duration } from 'aws-cdk-lib';

export async function CdkStack(scope: Construct, id: string, stage: string): Promise<Stack> {
  const stack = new Stack(scope, id, {
    stackName: id,
  });

  // lambdaFunctionのroleを定義
  const lambdaRole = new iam.Role(stack, `lambdaFunctionRole-${stage}`, {
    assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
  });
  // lambdaFunctionのroleにポリシーを追加
  lambdaRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonDynamoDBFullAccess'));
  lambdaRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'));

  // lambdaFunction の定義
  const lambdaFunction = new lambda.Function(stack, `lambdaFunction-${stage}`, {
    functionName: `lambdaFunction-${stage}`,
    code: lambda.Code.fromAsset('lambda/'),
    handler: 'lambdaFunction.lambda_handler',
    runtime: lambda.Runtime.PYTHON_3_8,
    role: lambdaRole,
    memorySize: 2048,
    timeout: Duration.minutes(3),
    environment: {
      REGION: Stack.of(stack).region,
    },
    tracing: lambda.Tracing.ACTIVE,
  });

  return stack;
}
