import { useRef, useState, useEffect, useCallback} from 'react';
import './App.css'
import { GoogleGenerativeAI } from '@google/generative-ai';
import GeminieLogoSvg from './svg/GeminieLogoSvg';
import { MemoizedTextFormatter } from './component/TextFormatter';
function App() { 

  const API_KEY = 'AIzaSyCPiMP9ouF6cjgTlhiPPZXBWsrdRNZckd8'
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  const textareaRef = useRef(null);
  const chatEndRef = useRef(null); 
  const [input, setInput] = useState('');
  const [chat, setChat]=useState([])    
 

  const scrollToBottom = useCallback(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) { 
      event.preventDefault(); 
      sendMessage(); 
    }
  };

  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    const maxHeight = window.innerHeight * 0.5;
    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
  }, []);
  
  const sendMessage = async () => {    
    const prompt = input    
    setInput('');
    setChat((prev)=>[...prev, {name:'나', text:prompt}])
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    setChat((prev)=>[...prev, {name:'Geminie', text:text}])        
  };

  useEffect(() => {
    adjustHeight();
  }, [input, adjustHeight]);

  useEffect(() => {
    scrollToBottom();  // Scroll to bottom every time the chat updates
  }, [chat, scrollToBottom]);

  return (
    <>
      <div className=' w-full h-screen flex flex-nowrap relative select-none'>
        <div className=' w-[280px] bg-gray-50  '>
          <div className=' px-4 py-6'>
            <div className=' w-full flex items-center px-1  space-x-2'>
              <GeminieLogoSvg />
              <div className=' font-bold'>
                Geminie
              </div>
            </div>              
          </div>      
        </div>

        <div className=' relative w-full h-full '>


          <div className='h-[5vh] '>
            <div className=' sticky top-0 mb-1.5 flex items-center justify-between z-10 h-14 p-2 px-4 font-semibold bg-token-main-surface-primar '>
              <div className=' flex space-x-2'>
                <div className=''>
                  Gemini
                </div>
                <div className=' text-gray-500'>
                  PRO
                </div>                
              </div>             
            </div>
          </div>


          <div className=' w-full flex justify-center overflow-y-auto h-[85vh]'>
            <div className=' w-[60vw]'>
              {chat.map((r, i)=>(
                <div key={i} className=' mb-6' ref={chatEndRef}> 
                  <div className=''>
                    {r.name}
                  </div>
                  <div>
                    <MemoizedTextFormatter key={i} text={r.text} />
                  </div>                  
                </div>
              ))}              
            </div>
            
          </div>


          <div className=' absolute bottom-0 w-full flex justify-center '>
            <div className=' w-[60vw] bg-whtie flex justify-center flex-wrap'>
              <div className='w-full flex justify-center'>
                <div className=' overflow-hidden flex flex-col w-full flex-grow relative border rounded-2xl shadow-[0_2px_6px_rgba(0,0,0,.05)]'>                
                    <textarea
                      ref={textareaRef}
                      className="        
                        sticky             
                        m-0 border-0 bg-transparent
                        resize-none
                        focus:ring-0
                        focus-visible:ring-0
                        py-[10px]
                        pr-10
                        placeholder-black/50
                        pl-10
                        min-h-10
                      "
                      value={input}
                      onInput={adjustHeight}
                      onChange={handleInputChange}   
                      onKeyDown={handleKeyDown}               
                      rows="1"
                      placeholder='메시지 내용: Gemini PRO'
                    />                    
                 
                  <button onClick={sendMessage} disabled="" className="absolute rounded-lg  border-black bg-black p-0.5 text-white transition-colors enabled:bg-black disabled:text-gray-400 disabled:opacity-10  md:bottom-3 md:right-5 " data-testid="send-button">
                    <span className="" data-state="closed">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white ">
                        <path d="M7 11L12 6L17 11M12 18V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        </path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>     
              <div className=' text-gray-300 text-xs'> 
                Geminie는 실수를 할 수도 있습니다. 중요한 정보를 확인해보세요
              </div>
            </div>            
          </div>
                    
        </div>

        
      </div>
    </>
  )
}




export default App



