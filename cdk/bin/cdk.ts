#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { CdkStack } from '../lib/cdk-stack';

async function buildApp(): Promise<void> {
  const app = new App();

  const stage: string = app.node.tryGetContext('stage');

  await CdkStack(app, `my-${stage}`, stage);
}

buildApp();
