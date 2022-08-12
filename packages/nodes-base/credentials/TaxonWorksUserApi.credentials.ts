import {
	ICredentialType,
	NodePropertyTypes,
} from 'n8n-workflow';

export class TaxonWorksUserApi implements ICredentialType {
	name = 'taxonWorksUserApi';
	displayName = 'TaxonWorks User';
	documentationUrl = 'taxonWorks';
	properties = [
		{
			displayName: 'User API token',
			name: 'token',
			type: 'string' as NodePropertyTypes,
			default: '',
		},
	];
}
