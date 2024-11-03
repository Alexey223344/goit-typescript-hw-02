// * Interface for image data from the API
export interface ApiImage {
  id: string;
  likes: number;
  description: string;
  urls: {
    full: string;
    small: string;
    [key: string]: string;
  };
  [key: string]: any;
}

// * Interface for the API search results

export interface FetchRes {
  results: ApiImage[];
  total: number;
  total_pages: number;
}

// * Interface in ImageGallery Open modal

export interface ModalOpenData {
  name: string;
  url: string;
}
