export interface SourcesTypes {
    types: string,
    sessions: number,
    views: number
}

export interface EngagementOverviewsTypes {
    duration: string,
    sessions: number,
    views: number
}

export interface PlatformTypes {
    system: string,
    visits: number,
    progress: number
}

export interface ChannelsTypes {
    channel: string,
    visits: number,
    progress: number,
    variant?: string
}

export interface ViewsDetailTypes {
    page: string,
    bounce_rate: string
}
