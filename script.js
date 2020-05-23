Math.trunc = Math.trunc || function(x) {//полифилл math.trunk для IE
  if (isNaN(x)) {
    return NaN;
  }
  if (x > 0) {
    return Math.floor(x);
  }
  return Math.ceil(x);
};
//получение данных из таблиц на странице
var tables = document.querySelectorAll('table');
var firstTableTds = tables[0].querySelectorAll('tr > td');
var secondTableTds = tables[1].querySelectorAll('tr > td');
var result = new Array(Math.trunc(secondTableTds.length/3));
for (var i = 0; i < result.length; i++) {
    result[i] = new Array(3);
}
//вычисление таблицы с результатом
for (var i = 0; i<secondTableTds.length; i+=3){ //проход по всем ID второй таблицы
	var id = Number(secondTableTds[i].innerHTML);
	for(var j = 0; j<firstTableTds.length; j+=4){
		var date = firstTableTds[j+1].innerHTML+'';
		if(date.indexOf('2019')!=-1 && id == firstTableTds[j+2].innerHTML ){//проверка что SUMM i-того врача получена в 2019 г
			//внесение результатов в таблицу с результатом
			if(result[Math.trunc(i/3)][0]==undefined)
				result[Math.trunc(i/3)][0]=0;
			result[Math.trunc(i/3)][0]+=Number(firstTableTds[j+3].innerHTML);
			result[Math.trunc(i/3)][1]=secondTableTds[i+1].innerHTML;
			result[Math.trunc(i/3)][2]=secondTableTds[i+2].innerHTML;
		}
	}
}

//создание HTML таблицы с результатом
window.onload = function (){
	var newTable = document.createElement("table");
	for(var y = 0; y < result.length; y++){
		if(result[y][0]>2500){
			var newRow = newTable.insertRow();
			for (var x = 0; x < result[y].length; x++){
				var newCell = newRow.insertCell(x);
				newCell.innerHTML = result[y][x];
			}
		}
	}
	document.body.appendChild(newTable);
}
