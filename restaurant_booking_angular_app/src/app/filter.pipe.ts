import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[],filterString: string, itemName: string): any[]{ 
  const result: any = [];
  if(!value || filterString === '' || itemName === ''){
    return value;
  }
  value.forEach((a:any)=>{
    if(a[itemName].trim().toLowerCase().includes(filterString.toLowerCase())){
    result.push(a);
  }
  });
  return result;
    
  }

}