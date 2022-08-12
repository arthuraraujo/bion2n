import {
	ICredentialType,
	NodePropertyTypes,
} from 'n8n-workflow';

export class TaxonWorksProjectApi implements ICredentialType {
	name = 'taxonWorksProjectApi';
	displayName = 'TaxonWorks Project';
	documentationUrl = 'taxonWorks';
	properties = [
		{
			displayName: 'Project API token',
			name: 'projectToken',
			type: 'string' as NodePropertyTypes,
			default: '',
		},
		{
			displayName: 'Project ID',
			name: 'projectId',
			type: 'string' as NodePropertyTypes,
			default: '',
		},
	];
}
