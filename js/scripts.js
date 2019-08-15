$(document).ready(function(){
	'use strict';

	//Создайте <div>, который при нажатии Ctrl+E превращается в <textarea>. 
	//Изменения, внесенные в поле, можно сохранить обратно в <div> 
	//сочетанием клавиш Ctrl+S, при этом <div> получит в виде HTML 
	//содержимое <textarea>. Если же нажать Esc, то <textarea> снова 
	//превращается в <div>, изменения не сохраняются.

	myTextarea.hidden = true;

	 document.onkeydown = function (e) {      //если Ctrl+E, показываем textarea
    if (e.ctrlKey && e.keyCode == '69'){
      myDiv.hidden = true;
      myTextarea.hidden = false;
      myTextarea.focus()
      myTextarea.innerHTML = myDiv.innerHTML;	//то, что было записано в div, переходит в textarea
      e.preventDefault();
    }

    if (e.ctrlKey && e.keyCode == '83'){	//если Ctrl+S, показываем div
      myDiv.hidden = false;
      myTextarea.hidden = true;
      myDiv.innerHTML = myTextarea.value;	//значение textarea преходит в div в HTML
      e.preventDefault();

    } else if (e.keyCode == '27'){			//если Esc, показываем div, скрываем textarea без сохранения изменений
      myDiv.hidden = false;
      myTextarea.hidden = true;
    }
  };

});