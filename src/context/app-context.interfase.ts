export interface AppState {
    isWS: boolean
}

export type AppActions = | { type: 'setIsWS'; payload: boolean }

export interface AppContextState extends AppState {
    dispatch: React.Dispatch<AppActions>
}