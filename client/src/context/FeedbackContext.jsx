
import React,{ useState,createContext, useEffect, useRef } from "react";




const FeedbackContext=createContext();


export function FeedbackProvider({children}){
    const API_URL=process.env.REACT_APP_API_ENDPOINT;
    const [isLoading,setIsLoading]=useState(true);
    const [feedback,setFeedback]=useState([]);
    const [feedbackEdit,setFeedbackEdit]=useState({
        item:{},
        edit : false
    });
    const [loadFeedbackInfo,setLoadFeedbackInfo]=useState({
        page : 1,
        count : 0,
        limit : 5
    });

    const loadFeedInfoRef=useRef(loadFeedbackInfo);


    // update the reference to loadFeedbackInfo state
    useEffect(()=>{
        loadFeedInfoRef.current=loadFeedbackInfo;
    },[loadFeedbackInfo]);


    useEffect(()=>{
        
        fetchFeedback(loadFeedbackInfo.page,loadFeedbackInfo.limit);
        
        
        const scrollHandler=async function(){
            let {
                scrollHeight,
                scrollTop,
                clientHeight
            }= (this === window)?this.document.documentElement:this;
            
            if(clientHeight + scrollTop >= scrollHeight){
                if(loadFeedInfoRef.current.page * loadFeedInfoRef.current.limit + 1 <= loadFeedInfoRef.current.count ){
                    setIsLoading(true);
                    setTimeout(()=>{
                        setLoadFeedbackInfo(prev=>{
                            return {
                                ...prev,
                                page : prev.page+1,
                            };
                        });
                        
                    },1000);
                }
                
            }
            
            
        }
        
        
        window.addEventListener("scroll",scrollHandler);
        // for mobile users
        document.body.addEventListener("touchmove",scrollHandler);

        // clean event listeners when component unmounts
        return ()=>{
            window.removeEventListener("scroll",scrollHandler);
            document.body.removeEventListener("touchmove",scrollHandler);
        }
    },[]);

    
    useEffect(()=>{
        if(loadFeedbackInfo.page > 1){

            fetchFeedback(loadFeedbackInfo.page,loadFeedbackInfo.limit);
        }
    },[loadFeedbackInfo.page]);



    const fetchFeedback=async (page,limit)=>{
        const response=await fetch(`${API_URL}/feedback?_sort=id&_order=desc&_page=${page}&_limit=${limit}`);
        let data;
        if(response.ok){
            data=await response.json();
        }else{
            data=[];
        }
        
        setIsLoading(false); 
        setFeedback(prev=>[
            ...prev,
            ...data
        ]);


        if(!loadFeedbackInfo.count){
            setLoadFeedbackInfo(prev=>{
                return {
                ...prev,
                count : +response.headers.get("X-Total-Count")
                };
            });
        }
        
        
    };

    

    // delete feedback
    const deleteFeedback=async (id)=>{
        
        if(window.confirm("Are you sure you want to delete this feedback ? ")){
            await fetch(`${API_URL}/feedback/${id}`,{
                method : "DELETE",
            });
            
            setFeedback(feedback.filter((item)=>item.id !== id));

        }

        
    };

    // set item to be updated
    const editFeedback=(item)=>{
        setFeedbackEdit({
            item,
            edit : true
        });
    };

    const updateFeedback=async (newItem)=>{
        
        const response= await fetch(`${API_URL}/feedback/${newItem.id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                text : newItem.text,
                rating : newItem.rating
            })
        });

        const data = await response.json();

        setFeedback(feedback.map((item)=>((item.id === data.id) ? {...item,...data} : item)
        ));
    }

    // Add feedback
    const addFeedback=async (newFeed)=>{
        const response = await fetch(`${API_URL}/feedback`,{
            method:"POST",
            body:JSON.stringify(newFeed),
            headers:{
                "Content-Type":"application/json"
            }
        });

        const data=await response.json();

        setFeedback([
            data,
            ...feedback
        ]);
    };

    return(
        <FeedbackContext.Provider value={{
            feedback,
            feedbackEdit,
            isLoading,
            setFeedback,
            deleteFeedback,
            addFeedback,
            editFeedback,
            setFeedbackEdit,
            updateFeedback
            }}>
            {children}
        </FeedbackContext.Provider>
            
    );
}

export default FeedbackContext;