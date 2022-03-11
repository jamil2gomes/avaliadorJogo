function retornaCorDaNota(nota:number):string{
    if(nota>=7 && nota <=10)
        return "#008000";
    if(nota>=5 && nota < 7)
        return "#FFA500";
    
    return "#FF0000";
}

export {
    retornaCorDaNota,
}