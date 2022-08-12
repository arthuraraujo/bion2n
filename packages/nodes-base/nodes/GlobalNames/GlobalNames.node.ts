import {
	IExecuteFunctions,
} from 'n8n-core';

import {
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import {
	OptionsWithUri,
} from 'request';

export class GlobalNames implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'GlobalNames',
		name: 'globalNames',
		icon: 'file:globalNames.svg',
		group: ['transform'],
		version: 1,
		description: 'GlobalNames helps parse, find, and verify scientific names',
		defaults: {
			name: 'GlobalNames',
			color: '#007934',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				options: [
					{
						name: 'Parse',
						value: 'parse',
					},
					{
						name: 'Verify',
						value: 'verify',
					},
				],
				default: 'parse',
				required: true,
				description: 'Resource to consume',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				displayOptions: {
					show: {
						resource: [
							'parse',
						],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get a parsed scientific name',
					},
				],
				default: 'get',
				description: 'The operation to perform.',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				displayOptions: {
					show: {
						resource: [
							'verify',
						],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get a scientific name verification',
					},
				],
				default: 'get',
				description: 'The operation to perform.',
			},
			{
				displayName: 'Scientific name',
				name: 'name',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'get',
						],
						resource: [
							'parse',
							'verify',
						],
					},
				},
				default:'',
				description:'A biological scientific name',
			},
			{
				displayName: 'With Details',
				name: 'withDetails',
				type: 'boolean',
				default: true,
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: [
							'parse',
						],
						operation: [
							'get',
						],
					},
				},
				options: [
					{
						displayName: 'Cultivars',
						name: 'cultivars',
						type: 'boolean',
						default: false,
					},
				],
			},
		],
	};


	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		let responseData;
		const returnData = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;
		const qs: IDataObject = {};

		for (let i = 0; i < items.length; i++) {
			let apiUrl = '';
			if (resource === 'parse') {
				const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
				qs['with_details'] = this.getNodeParameter('withDetails', i) as IDataObject;
				qs['cultivars'] = additionalFields.cultivars;
				apiUrl = 'https://parser.globalnames.org/api/v1/';
			}
			else if (resource === 'verify') {
				apiUrl = 'https://verifier.globalnames.org/api/v0/verifications/';
			}

			if (operation === 'get') {
				let name = this.getNodeParameter('name', i) as string;

				name = encodeURIComponent(name);

				const options: OptionsWithUri = {
					headers: {
						'Accept': 'application/json',
					},
					method: 'GET',
					uri: `${apiUrl}${name}`,
					json: true,
					qs,
				};

				responseData = await this.helpers.request(options);
				if (resource === 'parse') {
					responseData = responseData[0];
				}

				returnData.push(responseData);
			}
		}
		return [this.helpers.returnJsonArray(returnData)];
	}
}
