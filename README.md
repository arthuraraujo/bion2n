# Biology Node2Node (BioN2N): Connecting biodiversity informatics APIs to the powerful n8n workflow automation platform

BioN2N is a new project to develop biodiversity informatics nodes for the powerful workflow automation platform, [n8n.io](https://n8n.io), which enables building complex data workflows fast with little to no programming experience.

## Contents
* [Abstract](https://github.com/speciesfilegroup/bion2n#abstract)
* [Demo workflows](https://github.com/speciesfilegroup/bion2n#demo-workflows)
* [Installation](https://github.com/speciesfilegroup/bion2n#installation)
* [Acknowledgements](https://github.com/speciesfilegroup/bion2n#acknowledgements)
* [References](https://github.com/speciesfilegroup/bion2n#references)

## Abstract

A vast amount of biodiversity data is available from many different biodiversity informatics APIs. However, in order for scientists with little to no programming experience to use data from these APIs for their research, it could potentially require a significant time investment to learn a programming language, develop, and rigorously test the software. The emergence of no-code and low-code software architecture [[1](https://github.com/speciesfilegroup/bion2n#1), [2](https://github.com/speciesfilegroup/bion2n#2)] could potentially empower non-programmers with the ability to utilize biodiversity informatics APIs, helping to make these APIs more accessible to a broader number of people. Instead of writing scripts, no-code/low-code applications offer flexible graphical user interfaces that can make it easier to explore and learn APIs, and quickly construct complex data processing workflows. One such open source low-code application is [n8n.io](https://n8n.io), which is a powerful workflow automation platform. Within n8n, nodes are the basic unit of work and can take input, perform processing, and return output. To build an automation workflow, any nodes needed are added to the workspace and their inputs and outputs are connected together. For example, if you wanted to be notified about new species added to a genus in Catalogue of Life (CoL), you could query the CatalogueOfLife node for all species in genus _Maghrebotrogus_, use the GoogleSheet node to check if each species is in your known list of species spreadsheet, use the Gmail node to send an email notification about any new species, save any new species to your list of known species with the GoogleSheet node, and run the automated workflow on a schedule (see [Demo 1](https://github.com/speciesfilegroup/bion2n#demo-1)). Over 220 popular internet APIs have been wrapped into nodes within n8n, which could additionally allow integrating scientific knowledge with many other services on the internet. A major advantage offered by the n8n automation platform is that reusable workflows can be [shared as templates](https://n8n.io/workflows/), which could enable building a collaborative community of biodiversity informatics API users.

BioN2N is a new open source project to develop and maintain n8n nodes to wrap biodiversity informatics APIs that will be contributed back upstream to the n8n project. So far nodes have been developed for Barcode of Life, Bionomia, Catalogue of Life, ChecklistBank Datasets, Global Biodiversity Information Facility, Global Names, Integrated Taxonomic Information System, Open Tree of Life, TaxonWorks, Wikidata, ZooBank, and additional nodes are under development (please [open an issue ticket if you want a biology API wrapped](https://github.com/SpeciesFileGroup/bion2n/issues/new?assignees=&labels=&template=node_request.md&title=)). 

## Demo workflows

The bulk of this work focused on developing a generalized workflow automation tool by creating biodiversity informatics nodes for n8n. The biodiversity informatics community will very likely come up with much better use cases, but here are some simple examples of potential workflow automations to demonstrate how n8n works:

### Demo 1: Notifying about new species in a genus

This automated workflow checks if new species have been added to the genus, _Maghrebotrogus_, using the `CatalogueOfLife` node. If a species is not in the `GoogleSheet` [list of known species](https://docs.google.com/spreadsheets/d/1Z4YX3Wj3Vu9Vz3CTu98Uvo4OxSFlFJb5dJ1NPydCGBM/edit#gid=0), an [email notification is sent](https://user-images.githubusercontent.com/8573609/184546698-6168351d-48ac-4e8c-9a9c-6dd70018615f.png) using the `Gmail` node, and the new species are added to the list of known species `GoogleSheet`.
[![sm_demo_notify_new_species_with_email](https://user-images.githubusercontent.com/8573609/184545576-b2f6d96c-563a-421f-a3b1-367119210c42.png)](https://user-images.githubusercontent.com/8573609/184545606-4a5bea3f-4c10-4e1e-8679-9efd7880b510.png)


### Demo 2: How to use the Wikidata external identifier registry to access biodiversity informatics APIs
This demo shows how to use the [Wikidata Query Service](https://query.wikidata.org/#SELECT%20%3Ftaxon%20%3FtaxonLabel%20%3FtaxonRankLabel%20%3FboldID%20%3FcolID%20%3FeolID%20%3FgbifID%20%3FiNaturalistID%20%3FirmngID%20%3FitisID%20%3FncbiID%20%3FopenTreeID%20%3FubioID%20%3FwormsID%20%3FzooBankID%0AWHERE%20%0A%7B%0A%20%20%3Ftaxon%20%28wdt%3AP225%29%20%22Sertularia%20argentea%22.%0A%20%20OPTIONAL%20%7B%3Ftaxon%20wdt%3AP105%20%3FtaxonRank.%7D%0A%20%20OPTIONAL%20%7B%3Ftaxon%20wdt%3AP3606%20%20%3FboldID.%7D%0A%20%20OPTIONAL%20%7B%3Ftaxon%20wdt%3AP10585%20%3FcolID.%7D%0A%20%20OPTIONAL%20%7B%3Ftaxon%20wdt%3AP830%20%20%20%3FeolID.%7D%0A%20%20OPTIONAL%20%7B%3Ftaxon%20wdt%3AP846%20%20%20%3FgbifID.%7D%0A%20%20OPTIONAL%20%7B%3Ftaxon%20wdt%3AP3151%20%20%3FiNaturalistID.%7D%0A%20%20OPTIONAL%20%7B%3Ftaxon%20wdt%3AP5055%20%20%3FirmngID.%7D%0A%20%20OPTIONAL%20%7B%3Ftaxon%20wdt%3AP815%20%20%20%3FitisID.%7D%0A%20%20OPTIONAL%20%7B%3Ftaxon%20wdt%3AP685%20%20%20%3FncbiID.%7D%0A%20%20OPTIONAL%20%7B%3Ftaxon%20wdt%3AP9157%20%20%3FopenTreeID.%7D%0A%20%20OPTIONAL%20%7B%3Ftaxon%20wdt%3AP4728%20%20%3FubioID.%7D%0A%20%20OPTIONAL%20%7B%3Ftaxon%20wdt%3AP850%20%20%20%3FwormsID.%7D%0A%20%20OPTIONAL%20%7B%3Ftaxon%20wdt%3AP1746%20%20%3FzooBankID.%7D%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22%5BAUTO_LANGUAGE%5D%2Cen%22.%20%7D%0A%7D) to access biodiversity informatics external identifiers, which in turn can be used to access data about species from the biodiversity informatics nodes. 
[![sm_demo_wikidata_external_identifiers](https://user-images.githubusercontent.com/8573609/184545709-7e6932f0-612c-4832-a3ae-3980a7f782f4.png)
](https://user-images.githubusercontent.com/8573609/184545659-23cb4fb1-a8f8-4a50-a3b2-852f43e5038a.png)


### Demo 3: Recording scientific names mentioned on social media
This automatic workflow searches for mentions of "species" within a sample of Twitter tweets posted in the last 24 hours, uses the `GlobalNames` node wrapping the [GNFinder service](https://finder.globalnames.org) to find any scientific names mentioned in the tweet text, and saves the [output](https://docs.google.com/spreadsheets/d/1Z4YX3Wj3Vu9Vz3CTu98Uvo4OxSFlFJb5dJ1NPydCGBM/edit#gid=0) to a `GoogleSheet` spreadsheet.
[![sm_demo_sci_names_social_media](https://user-images.githubusercontent.com/8573609/184546028-012da5d6-275f-46bd-9bee-ed1ced4084e6.png)]((https://user-images.githubusercontent.com/8573609/184546021-a8b51aaa-1121-4bd2-b5e0-b7be4d33a356.png))


### Demo 4: Tracking GBIF occurrences by country over time
Occurrences by country are recorded hourly from the [GBIF API](https://www.gbif.org/developer/summary) using the `GBIF` node, and the [output](https://docs.google.com/spreadsheets/d/1W9zZqMekX03fnI2xVhxKhJkmP5GySOSfgSkUI6-IR6A/edit#gid=0) is saved to a `GoogleSheets` spreadsheet. 
[![sm_demo_tracking_metrics_over_time](https://user-images.githubusercontent.com/8573609/184546113-dc457184-668b-4ab3-ac05-d738605af30d.png)](https://user-images.githubusercontent.com/8573609/184546064-d59edbd7-38da-46f9-990f-a65a61d2aa0b.png)


### Demo 5: Promoting a species of the day on social media
This automated workflow draws a random species from Catalogue of Life and sends [Species of the Day tweet](https://twitter.com/bion2n/status/1558282757050142720).
[![sm_demo_species_of_the_day_with_nodes](https://user-images.githubusercontent.com/8573609/184547415-cc46c656-5b93-4e99-877b-9dfc923798e2.png)
](https://user-images.githubusercontent.com/8573609/184546199-37f2e9c7-db2f-4ea8-87a0-7f45cb5faf11.png)


## Installation

If not installed already, please install the dependency [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) on your platform downloadable [here](https://nodejs.org/en/download/).

1) Clone this repo:
```
git clone https://github.com/SpeciesFileGroup/bion2n.git
```

2) Change directories into bion2n:
```
cd bion2n
```

3) Install npm dependencies
```
npm install
```

4) Run the build process
```
npm run build
```

5) Run n8n with BioN2N nodes
```
npm run start
```
Launch your web browser and navigate to [http://localhost:5678](http://localhost:5678)

6) If you are a developer, instead of running start, run in development mode:
```
npm run dev
```
Launch your web browser and navigate to [http://localhost:8080](http://localhost:8080)

## Acknowledgements

I am very grateful to the [n8n.io founder Jan Oberhauser](https://blog.n8n.io/celebrating-n8n-second-anniversary/), and n8n.io team and [community](https://community.n8n.io/) for developing the low-code application and the developers of the biodiversity informatics APIs that this work depends upon. Many thanks to our [Species File Group](https://speciesfilegroup.org/about.html) founder David Eades, and all of my colleagues for their ideas, inspiration, and support: Beth Frank, Deborah Paul, Dmitry Dmitriev, Dmitry Mozzherin, Heidi Hopkins, Hernán Pereira, Jim Tucker, José Luis Pereira, Leslie Deem, Matt Yoder, R. Edward DeWalt, Rich Flood, and Yury Ruskov. In memory of Marilyn Beckman.

## References

### 1
Caballar, R. D. 2020. Programming Without Code: The Rise of No-Code Software Development. IEEE Spectrum. https://spectrum.ieee.org/programming-without-code-no-code-software-development

### 2
Miller, A. 2021. Low Code vs No Code Explained. BMC Blogs. https://www.bmc.com/blogs/low-code-vs-no-code/
