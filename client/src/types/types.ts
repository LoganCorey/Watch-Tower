export type Issue ={
    id: number;
    seriesId: number;
    issue_number: number;
    is_variant: boolean;
    variant_info: string;
    publication_date: Date,
    cover_path:string;
}

export type PublisherInterface = {
    id: number;
    name: string;
    publisher_image: string;
}

export type SeriesInterface = {
    id: string;
    issues: Issue[];
    name: string;
    publisher: PublisherInterface;
    total_issues: number;
    year_began: number;
    year_ended: number;
}