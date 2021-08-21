export interface ItemsProps{
    done:string | boolean,
    onPressItem:(id:any)=> void
}

export interface Item{
    id:number,
    done:number,
    value:string
}

