let doorWin;
let endGame = false;
let cnt = 0;
let blocked = 0;
let commonCnt=0;
let doorPrevious = 0;
let successfulChanged = 0;
let successfulNotChanged = 0
let unSuccessfulNotChanged = 0, unSuccessfulChanged= 0;
let commonChanged = 0, commonNotChanged = 0;

function setWinDoor(){
    doorWin = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    console.log('winDoor = '+doorWin);
    cnt = 0;

    blocked = 0;

    for(let i = 1; i < 4; i++){
        document.getElementById("door" + i.toString()).style.backgroundColor="black";
    }
}

function chooseAnotherDoor(door){
    newDoor = Math.floor(Math.random() * (3 - 1 + 1) ) + 1;
    
    if(newDoor==doorWin || newDoor==door){
       return chooseAnotherDoor(door);
    }
    else { 
        return newDoor;
    }
}

function chooseDoor(doorNumber){   
    if(blocked == doorNumber) return;
    if(doorNumber == doorWin)
    {
        cnt++;
        
        if(cnt==2)
        {
            commonCnt++;
            let d = document.getElementById("door" + (doorWin.toString()));
            d.style.backgroundColor = "#83FF83";
            blocked = doorNumber;
            document.getElementById("commonCounter").innerHTML = 'Количество попыток: '+(commonCnt.toString());
            setTimeout(setWinDoor,  1000);
            if ( doorPrevious != doorNumber){
                successfulChanged++;
            }else{
                successfulNotChanged++;
            }
            commonChanged = successfulChanged+unSuccessfulChanged;
            commonNotChanged = successfulNotChanged+unSuccessfulNotChanged;
        }
        if(cnt==1){
            wrongDoor = chooseAnotherDoor(doorNumber);   
            let d = document.getElementById("door"+doorWin.toString());
            d.style.backgroundColor = "#83FFEC";
            doorPrevious = doorNumber;
            let t = document.getElementById("textDoor"+doorWin.toString());
            t.style.color = "#6b6b2f";
            blocked = wrongDoor;
            let dWrong = document.getElementById("door"+wrongDoor.toString());
            setTimeout(() => {
                dWrong.style.backgroundColor = "#FF8383";
            }, 100); 
        }
        
        
        
    }else
    {
        cnt++;
        if (cnt<2){
            wrongDoor = chooseAnotherDoor(doorNumber);   
            
            let d = document.getElementById("door"+(doorNumber.toString()));
            d.style.backgroundColor = "#83FFEC";
            blocked = wrongDoor;
            let dWrong = document.getElementById("door"+(wrongDoor.toString()));
            setTimeout(() => {
                dWrong.style.backgroundColor = "#FF8383";
            }, 100); 
            doorPrevious = doorNumber;
        }else{
            commonCnt++;
            blocked = doorNumber;
            if(wrongDoor==doorNumber){
                document.getElementById("door"+(doorWin.toString())).style.backgroundColor="red";
            }
            document.getElementById("commonCounter").innerHTML = 'Количество попыток: '+(commonCnt.toString());
            let d = document.getElementById("door"+(doorWin.toString()));
            d.style.backgroundColor = "#83FF83";
            
            setTimeout(setWinDoor,  1000);
            if ( doorPrevious != doorNumber){
                unSuccessfulChanged++;
            }else{
                unSuccessfulNotChanged++;
            }
            commonChanged = successfulChanged+unSuccessfulChanged;
            commonNotChanged = successfulNotChanged+unSuccessfulNotChanged;
        }

    }
    document.getElementById("leftCount").innerHTML = commonChanged.toString();
    document.getElementById("leftSuccessful").innerHTML = successfulChanged.toString();
    document.getElementById("leftUnsuccessful").innerHTML = unSuccessfulChanged.toString();
 
    document.getElementById("rightCount").innerHTML = commonNotChanged.toString();
    document.getElementById("rightSuccessful").innerHTML = successfulNotChanged.toString();
    document.getElementById("rightUnsuccessful").innerHTML = unSuccessfulNotChanged.toString();
   
}



window.onload = setWinDoor;