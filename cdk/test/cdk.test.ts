import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import { App } from 'aws-cdk-lib';
import { CdkStack } from '../lib/cdk-stack';

test('Empty Stack', async () => {
  const app = new App();
  const stage = app.node.tryGetContext('stage');
  // WHEN
  const stack = await CdkStack(app, 'MyTestStack', 'dev');
  // THEN
  expectCDK(stack).to(
    matchTemplate(
      {
        Resources: {},
      },
      MatchStyle.EXACT,
    ),
  );
});
