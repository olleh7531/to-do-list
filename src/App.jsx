// useState : 상태(State) 관리 -> 할일목록, 입력창
// useRef : DOM 요소 (입력창)
import { useState, useRef } from "react";
import "./App.css";

// 결과 -> 페이지 컴포넌트
function App() {
  // 상태(State) 선언
  // todos : 현재 할일 목록을 저장하는 상태 (배열로 관리)
  // setTodos : 할 일 목록을 변경할 때 사용하는 함수
  const [todos, setTodos] = useState([]);

  // inputValue : 입력창에 입력된 문자열 저장하는 상태
  // setInputValue : 입력창의 값을 변경하는 함수
  const [inputValue, setInputValue] = useState("");

  // Ref 선언
  const inputRef = useRef(null);
  // ~> input 태그 작성 후 참조할 수 있도록 연결
  // inputRef.current 를 통해 실제 input 요소에 접근 가능

  // 할일 추가 함수 : 할일 정보(id ,할일, 완료여부) 생성 -> todos(배열)에 추가
  // + input창 비우기, 자동 포커스, 공백상태에서는 입력되지 않게 막기
  const handleAddTodo = () => {

    if(inputValue.trim() === ""){
      alert('내용을 입력하세요.');
      return;
    }

    // 새로운 할 일 객체 생성
    const newTodo = {
      id : Date.now(),  //ms 단위로 숫자로 반환
      text : inputValue,
      isDone : false
    }

    // 위 객체를 todos 배열에 추가 (기존 배열을 복사 + 추가 => 새로운 배열)
    setTodos([...todos, newTodo]);

    // 입력창 비우기
    setInputValue("");
    
    // ?. : optional chaining : 앞 요소가 null 값이 아닌 경우만 실행
    // 입력후에 창 비워지면 자동으로 커서도 이동 (바로 입력)
    inputRef.current?.focus();
  }

  // 엔터키 입력 처리 함수
  const handleKeyDown = (e) => { //e : 이벤트 객체
    if(e.key === "Enter"){
      handleAddTodo(); // 할일 추가 함수 호출
    }
  }

  // 완료/취소 토글 함수
  const handleToggleTodo = (id) => { //id : 할일 식별자
    // setTodos : 할일 isDone 속성 변경
    // 배열 map 함수 : 배열안에 각 값을 순차적으로 가져와줌
    // -> 인자로받은 id와 같은 id를 가진 할일객체만 수정 / 나머지는 변경 x
    setTodos(
      todos.map((todo)=>
        (todo.id === id)? {...todo, isDone : !todo.isDone} : todo
      )
    );
  }

  // 삭제 함수
  const handleDeleteTodo = (id) =>{
    // setTodos : 할일 삭제
    // 배열 filter 함수 : 배열내에서 특정 조건을 가진 값들만 모아서 새로운 배열 생성
    // => 선택한 할일 id와 다른 id를 가진 할일만 모아서 todos 다시 저장
    setTodos(
      todos.filter((todo)=>todo.id!==id)
    );
  }


  return (
    <div className="container">
      <h2>📝 Todo List</h2>

      <div className="input-area">

        <input
          ref = {inputRef}
          value = {inputValue}
          // 사용자가 입력할 때마다 입력값을 inputValue 상태에 저장
          onChange = {(e)=>setInputValue(e.target.value)}
          onKeyDown = {handleKeyDown}
          placeholder="할 일을 입력하세요" //힌트
        />
        <button
          id = "addBtn"
          onClick = {handleAddTodo}
        >
          추가
        </button>
      </div>

      <ul id="todoList">

          {todos.map((todo) => (// html 반환
            //React 에서는 반복되는 요소마다
            // 고유한 key가 반드시 필요함
            <li key = {todo.id}>
              <span
                className={`todo-text ${todo.isDone?"done":""}`}
              >
                {todo.text}
              </span>
              <div className="btn-group">
                <button
                  className="doneBtn"
                  style={{
                    background : todo.isDone? "#ff9800" : "#2196f3"
                  }}
                  onClick={()=> handleToggleTodo(todo.id)}
                >
                  {todo.isDone? "취소":"완료"}
                </button>
                <button className="deleteBtn"
                  onClick= {()=>handleDeleteTodo(todo.id)}
                >
                  삭제
                </button>
              </div>
            </li>
          
          ))}

          

      </ul>
    </div>
  );
}

// App 컴포넌트를 다른 파일에서 사용할 수 있도록 내보낸다.
export default App;