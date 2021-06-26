/*
   Type declarations generated with http://www.json2ts.com/
   Annotations for each page of the OAM catalogue
*/

declare namespace OAM {

  interface Meta {
      provided_by: string;
      license: string;
      website: string;
      page: number;
      limit: number;
      found: number;
  }

  interface Properties {
      thumbnail: string;
      tms: string;
      wmts: string;
      sensor: string;
      license: string;
      tags: string;
      crs: string;
      dimensions: number[];
      url: string;
      bands?: number;
      resolution_in_meters?: number;
      filename: string;
      dtype: string;
      colorinterp: string[];
      resolution: number[];
  }

  interface Geojson {
      type: string;
      coordinates: number[][][];
      bbox: number[];
  }

  interface User {
      _id: string;
      name: string;
  }

  interface Result {
      _id: string;
      uuid: string;
      __v: number;
      title: string;
      platform: string;
      provider: string;
      contact: string;
      properties: Properties;
      acquisition_start: Date;
      acquisition_end: Date;
      uploaded_at: Date;
      file_size: number;
      projection: string;
      gsd: number;
      footprint: string;
      meta_uri: string;
      geojson: Geojson;
      bbox: number[];
      user: User;
  }

  export interface Catalogue {
      meta: Meta;
      results: Result[];
  }
}
