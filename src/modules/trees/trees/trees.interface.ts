
export interface optionContent {
    key:string;
    val:string;
}

export interface TreesInterface{
    identity:string;
    prompt:string;
    response:{
        buttons: optionContent[]
    }
}