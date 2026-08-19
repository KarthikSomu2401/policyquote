import type { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { describe, expect, it } from '@jest/globals';
import { handler } from './handler';

type LambdaResponse = {
  statusCode: number;
  body: string;
  headers?: Record<string, string>;
};

const context = {} as Context;

function request(
  method: string,
  path: string,
  body?: unknown,
): APIGatewayProxyEvent {
  return {
    body: body === undefined ? null : JSON.stringify(body),
    headers: { 'content-type': 'application/json' },
    httpMethod: method,
    isBase64Encoded: false,
    path,
    pathParameters: null,
    queryStringParameters: null,
    multiValueHeaders: {},
    multiValueQueryStringParameters: null,
    requestContext: {} as APIGatewayProxyEvent['requestContext'],
    resource: path,
    stageVariables: null,
  };
}

async function invoke(event: APIGatewayProxyEvent): Promise<LambdaResponse> {
  return (await handler(event, context, () => undefined)) as LambdaResponse;
}

describe('policyquote API contract', () => {
  it('returns health status and knowledge-base version', async () => {
    const response = await invoke(request('GET', '/health'));

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual({
      status: 'ok',
      kbVersion: '1.0.0',
    });
  });

  it('rejects invalid quote requests with 400', async () => {
    const response = await invoke(
      request('POST', '/policy/quote', { customerName: '' }),
    );

    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body)).toEqual({
      message: 'Invalid quote request',
    });
  });

  it('returns required quote fields using the risk-band premium formula', async () => {
    const response = await invoke(
      request('POST', '/policy/quote', {
        customerName: 'Karthik',
        propertyValue: 800000,
        age: 80,
        propertyType: 'House',
        previousClaims: 3,
        postcode: 'EX1 2AB',
      }),
    );
    const quote = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(quote).toEqual(
      expect.objectContaining({
        customerName: 'Karthik',
        annualPremium: 792,
        riskScore: 90,
        appliedFactors: expect.any(Array),
      }),
    );
    expect(quote.appliedFactors.map((factor: { id: string }) => factor.id)).toEqual(
      expect.arrayContaining([
        'age_young_elderly',
        'previous_claims_high',
        'property_value_high',
        'postcode_flood_zone',
      ]),
    );
  });
});
