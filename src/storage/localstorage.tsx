import { IIssue } from "../models/Issue";
import { IRepository } from "../models/repository";
import { initialState } from "../store/repoSlice";

export const LOCAL_TASK_STATE = "recoil_tasks";
export const LOCAL_COLOR_COUNT_STATE = "recoil_color_count";

export const initLocalStorage = (fullName:string,repository:IRepository) =>{
    const currentStore = localStorage.getItem('currentStore');
    if(!currentStore)
    {
        localStorage.setItem('currentStore',fullName);
    }
    const data = localStorage.getItem(fullName);
    if(data){
        localStorage.setItem('currentStore',fullName);
        return 1;
    }
    else{
        const repo = initialState;
        let temp = {...repo,repository}
        localStorage.setItem(fullName,JSON.stringify(temp));
        localStorage.setItem('currentStore',fullName);
        return 0;
    }
}

export const updateRepositoryStorage = (repo:IRepository) => {
    const fullName = localStorage.getItem('currentStore');
    if(fullName){
        var currentData = JSON.parse(localStorage.getItem(fullName)!);
        currentData.repository = repo;
        localStorage.setItem(fullName,JSON.stringify(currentData));
    }
} 

export const updateTodoStorage = (todo:IIssue[]) => {
    const fullName = localStorage.getItem('currentStore');
    if(fullName){
        var currentData = JSON.parse(localStorage.getItem(fullName)!);
        currentData.todo = todo;
        console.log("updated todo: ",currentData);
        localStorage.setItem(fullName,JSON.stringify(currentData));
    }
} 


export const updateDoneStorage = (done:IIssue[]) => {
    const fullName = localStorage.getItem('currentStore');
    if(fullName){
        var currentData = JSON.parse(localStorage.getItem(fullName)!);
        currentData.done = done;
        console.log("updated done: ",currentData);
        localStorage.setItem(fullName,JSON.stringify(currentData));
    }
} 

export const updateInprogressStorage = (inProgress:IIssue[]) => {
    const fullName = localStorage.getItem('currentStore');
    if(fullName){
        var currentData = JSON.parse(localStorage.getItem(fullName)!);
        currentData.inProgress = inProgress;
        console.log("updated inProgress: ",currentData);
        localStorage.setItem(fullName,JSON.stringify(currentData));
    }
} 