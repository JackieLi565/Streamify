export type PageInfo = {
  totalResults: number;
  resultsPerPage: number;
};

export type Thumbnails = {
  default: {
    url: string;
    width: number;
    height: number;
  };
  medium: {
    url: string;
    width: number;
    height: number;
  };
  high: {
    url: string;
    width: number;
    height: number;
  };
};

export type Id = {
  kind: string;
  videoId: string;
};

export type Snippet = {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
};

export type SearchResultItem = {
  kind: string;
  etag: string;
  id: Id;
  snippet: Snippet;
};

export type SearchListResponse = {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: PageInfo;
  items: SearchResultItem[];
};
