(function(){
	'use strict';

///added lets

	let todoInput 		= document.getElementById('todoInput'),
		addBtn 			= document.getElementById('addBtn'),
		form 			= document.querySelector('form');
		
	let existTodos = getStorage();
	existTodos.forEach(function(todo){
		createTask('todos', todo);
	});

///added events


	todoInput.addEventListener('input', function(event){
		//console.log(event);
		if (todoInput.value.length > 3) { 								///опред длину строки,кот ввели, инпут сравниваем с 3 
			addBtn.removeAttribute('disabled'); 						///разблок кнопки путем удаления атрибута дисейблд
		} else {
			addBtn.setAttribute('disabled', true); 						//блокируем кнопку
		}
	});

	form.addEventListener('submit', function(event){
		event.preventDefault(); 										//запрещаем отправку формы 

		createTask('todos', todoInput.value); 							// вызваем функцию введения задачи текст в списке тудус
		createTaskAtStorage(todoInput.value); 							//вызов функции сохранения задачи в локалсторадж

		todoInput.value = ''; 											//очищение значения поля ввода 
		addBtn.setAttribute('disabled', true); 							//блокируем кнопку
	});


///block of functions

	function createTask(targetList, text) {
		let newLi = document.createElement('li'), 						// создание эл.списка
			html = `
					<label>
							<input type="checkbox">
							<span>${text}</span>
					</label>
						<input type="text" value="${text}" hidden>
						<button class="editBtn">Edit</button>
						<button class="deleteBtn">Delete</button>
						<button class="saveBtn" hidden>Save</button>
						<button class="cancelBtn" hidden>Cancel</button>
					`;  												// готовим штмл для эл списка тудус
		if (targetList == 'completed') {
			html = `${text} <button class="deleteBtn">Delete</button>`	// готовим штмл для эл списка сомплитед
		}

		newLi.innerHTML = html; 										//записываем штмл в эл списка 

		document.getElementById(targetList).appendChild(newLi); 		//выводим эл списка в указанный список (тудус или комплитед)
																		//тудус при создании эл,комплитед при перемещении
		addEvents(newLi);												//вызываем функцию добавления событий 		
	}

//////////////////добавляем события
	function addEvents(li){
	let checkbox = li.querySelector('input[type="checkbox"]'),			//находим чекбокс
		label = li.querySelector('label'),								//находим лейбл
		deleteBtn = li.querySelector('.deleteBtn'),						//находим кнопку удаления задачи
		editBtn = li.querySelector('.editBtn'), 						//находим кнопку redactirovanija задачи
		editInput = li.querySelector('input[type="text"]'),				//находим поле редактирования текста задачи
		saveBtn = li.querySelector('.saveBtn'),							//находим кнопку сохранения задач
		cancelBtn = li.querySelector('.cancelBtn'); 					//находим кнопку отмены редактирования задач
	

		if (checkbox){
		checkbox.addEventListener('change', function(){ 				//добавляем обработчик события чейндж для чекбокса ,если чекбокс есть
			createTask('completed', label.innerText);  					//вызов функции создания задачи в списке комплитед
			deleteElem(li); 											// вызов функции удаления эл, передаем туда эл списка 
				});
		}

		if (deleteBtn) {
			deleteBtn.addEventListener('click', function(){ 			///добав обработчик события нажатия на кнопку удаления, если она есть
				deleteElem(li); 										//вызываем функ удаления эл, передаем туда эл списка
				if (label){
					deleteTaskFromStorage(label.innerText);
				}
			});
		}

		if (editBtn){
			editBtn.addEventListener('click', function(){
				toggleVisibility([label, deleteBtn, editBtn], true);
				toggleVisibility([editInput, saveBtn, cancelBtn], false);
				
			})
		}

		if (cancelBtn){
			cancelBtn.addEventListener('click', function(){
				toggleVisibility([label, deleteBtn, editBtn], false);
				toggleVisibility([editInput, saveBtn, cancelBtn], true);
				
				
			})
		}
		if (saveBtn){
			saveBtn.addEventListener('click', function(){
				toggleVisibility([label, deleteBtn, editBtn], false);
				toggleVisibility([editInput, saveBtn, cancelBtn], true);

				let span = label.querySelector('span');

				if (editInput.value.length > 0) {
					updateTaskAtStorage(span.innerText, editInput.value);
				} else {
					updateTaskAtStorage(span.innerText);
					deleteElem(li);
				}
				
				span.innerText = editInput.value;
			})
		}

		if (editInput) {
			editInput.addEventListener('keypress', function(event){
				console.log(event);
				if (event.keyCode == 13) { 								//13 код клавиши энтер
					saveBtn.click();									//програмно вызиваем нажатие сейв
				}
			})
		}
	}

	function toggleVisibility(elems, status) {
		elems.forEach(function(elem){
			elem.hidden = status;
		});
	}

	function deleteElem(elem){ 											//удаляем эл, который передали в параметре элем
		elem.remove();
	}


	function createTaskAtStorage(todo) {

		let todos = getStorage();
		todos.push(todo);
		setStorage(todos);
	}

	function updateTaskAtStorage(oldTodo, newTodo) {
		let todos = getStorage();

		todos.forEach(function(todo, index){
			if (todo == oldTodo.trim()) {
				todo[index] == newTodo.trim();
			}
		});

		setStorage(todos);

	}

	function deleteTaskFromStorage(todo){
		let todos = getStorage(),
			index = todos.indexOf(todo.trim());

		if (index > -1) {
			todos.splice(index, 1);
		}

		setStorage(todos);
		
	}

	function getStorage() {
		let todos = localStorage.getItem('todos'); 				//забираем из локального хранилища строку с задачами
		todos = todos ? todos.split('**') : [];

		return todos;
	}

	function setStorage(todos) {
		todos = todos.join('**');
		localStorage.setItem('todos', todos);
	}

})();