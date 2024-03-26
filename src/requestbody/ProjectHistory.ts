interface Tech {
  name: string;
  logo: string;
}

export interface ProjectHistoryReqBody {
  title: string;
  description: string;
  technology: Tech[];
}
