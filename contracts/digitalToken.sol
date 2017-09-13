pragma solidity ^0.4.8;
contract digitalToken{
   string public standard = 'Token 0.1';
   string public name;
   string public symbol;
   uint8 public decimals;
   
    struct video {                  
        address ad;
        uint tokens;
        string vidTitle;
        address owner;
        uint256 buyprice;
    }
    
    /*
     * constructor
     * @param string tokenName, uint8 decimalUnits, string tokenSymbol
     * @author Shubhabrata Mukherjee
     */ 
    function digitalToken(   
       string tokenName,
       uint8 decimalUnits,
       string tokenSymbol
       ) {                      
       name = tokenName;                                   
       symbol = tokenSymbol;                               
       decimals = decimalUnits;                            
   }

    mapping (address => uint256) public balanceOf;          //total token balance for user addresses
    mapping(address=>mapping(address=>video))vid;           //mapping for video for every user address
    mapping(address=>address[])allVideos;                   //stack all videos with their addresses for every user address
    mapping(address=>mapping(address=>uint))index;          //indexing for every video for a user address

    event ReturnResult(string message);             //event for returning result for any function


    //adding a new video to the contract 
    /*
     * addVid
     * adding a new video to the contract 
     * @param address vidAddress, uint tokens, string vidTitle, address owner, uint256 buyprice
     * @event ReturnResult 
     * @author Sankalp Sharma
     */      
    function addVid(address vidAdress,uint supply,string name,address owner,uint buyprice)  {
        video memory v;
        v.ad=vidAdress;
        v.tokens=supply;
        v.vidTitle=name;
        v.owner=owner;
        v.buyprice=buyprice;
        vid[this][vidAdress]=v;
        balanceOf[this]+=supply;
        ReturnResult("Video Added");
        return ;
        
    }

    /*
     * readVidBySender
     *reading video for the sender of the transaction  
     * @param address vidAddress
     * @return address vidAddress, uint tokens, string vidTitle,address owner, uint256 buyprice
     * @author Shubhabrata Mukherjee
     */    
    function readVidBySender(address vidAddress) constant returns(address,uint,string,address,uint256){
        
        return (vid[msg.sender][vidAddress].ad,vid[msg.sender][vidAddress].tokens,vid[msg.sender][vidAddress].vidTitle,vid[msg.sender][vidAddress].owner,vid[msg.sender][vidAddress].buyprice);
    }

     /*
     * readVidByUser
     *reading video for any user address  
     * @param address vidAddress, address user
     * @return address vidAddress, uint tokens, string vidTitle,address owner, uint256 buyprice
     * @author Shubhabrata Mukherjee
     */
    function readVidByUser(address vidAddress,address user) constant returns(address,uint,string,address,uint256){
        
        return (vid[user][vidAddress].ad,vid[user][vidAddress].tokens,vid[user][vidAddress].vidTitle,vid[user][vidAddress].owner,vid[user][vidAddress].buyprice);
    }
    
    /*
     * checkIfVidExists
     * validation to check the availability of video to a user 
     * @param address user, address vidAddress
     * @return bool
     * @author Sankalp Sharma
     */
    function checkIfVidExists(address user,address vidAddress) constant returns(bool){
        if (vid[user][vidAddress].ad==address(0x0)){
            return false;
        } else if (vid[user][vidAddress].tokens>0){
            return true;
        }
        return false;
    }
    
    /*
     * readBalance
     * to read ether balance of any user(only for demo purpose)
     * @return uint256 ether balance
     * @author Sankalp Sharma
     */
    function readBalance()constant returns(uint256){
        return (msg.sender.balance);
    }
    
    /*
     * payOwner
     * to transfer ether to a user address
     *param address to,uint amount
     * @author Shubhabrata Mukherjee
     */
    function payOwner(address to,uint amount,address secondAcc){
        to.transfer(amount/2);
        secondAcc.transfer(amount/2);
    }
    
    /*
     * buyTokens
     * buying tokens for a given video
     * @param  address vidAddress, uint amount
     * @return string success/false, video availability
     * @author Shubhabrata Mukherjee
     */
    function buyTokens (address vidAddress,uint amount,address secondAcc) payable  {
        if (vid[this][vidAddress].ad!=address(0x0)){    
            if (vid[this][vidAddress].tokens>=amount&&amount>0){
                if (vid[this][vidAddress].buyprice*amount<=msg.value){
                    if (vid[msg.sender][vidAddress].ad==address(0x0)){
                        video memory v;
                        v.ad=vidAddress;
                        v.tokens=amount;
                        v.vidTitle=vid[this][vidAddress].vidTitle;
                        v.owner=vid[this][vidAddress].owner;
                        v.buyprice=vid[this][vidAddress].buyprice;
                        vid[msg.sender][vidAddress]=v;
                        vid[this][vidAddress].tokens-=amount;
                        allVideos[msg.sender].push(vidAddress);
                        index[msg.sender][vidAddress]=allVideos[msg.sender].length-1;
                        balanceOf[this]-=amount;
                        balanceOf[msg.sender]+=amount;
                        if (msg.value-vid[msg.sender][vidAddress].buyprice*amount>0){
                            msg.sender.transfer(msg.value-vid[msg.sender][vidAddress].buyprice*amount);

                        }
                        payOwner(vid[this][vidAddress].owner,vid[this][vidAddress].buyprice*amount,secondAcc);
                        ReturnResult("tokens credited");
                        return ;
                    }
                    vid[this][vidAddress].tokens-=amount;
                    vid[msg.sender][vidAddress].tokens+=amount;
                    if (msg.value-vid[msg.sender][vidAddress].buyprice*amount>0){
                        msg.sender.transfer(msg.value-vid[msg.sender][vidAddress].buyprice*amount);
                    }
                    balanceOf[this]-=amount;
                    balanceOf[msg.sender]+=amount;
                    payOwner(vid[this][vidAddress].owner,vid[this][vidAddress].buyprice*amount,secondAcc);
                    ReturnResult("tokens credited");
                    return ;
                }
                ReturnResult("ether amount inefficient");
               throw;
            
            }
            ReturnResult("tokens not available");
            throw;
        }
        ReturnResult("video does not exist");
        throw;
    }
    
    /*
     * checkToRemoveVidWith0Balance
     * additional check to remove videos with 0 tokens in user account 
     * @param  address vidAddress
     * @author Sankalp Sharma
     */
    function checkToRemoveVidWith0Balance(address vidAddress){
        if (vid[msg.sender][vidAddress].tokens==0) {
            delete vid[msg.sender][vidAddress];
            delete allVideos[msg.sender][index[msg.sender][vidAddress]]; 
            delete index[msg.sender][vidAddress];
            
        }
    }
    
     /*
     * readAllVids
     * reading all videos for a 
     * @return  address vidAddress
     * @author Shubhabrata Mukherjee
     */
    function readAllVids() constant returns(address[]){
        
        return allVideos[msg.sender];
        
    } 
    
    /*
     * transferTokens
     * transferring video tokens to another user 
     * @param address newOwner, address vidAddress, uint amount
     * @return string  availability of token 
     * @author Sankalp Sharma
     */
    function transferTokens(address newOwner,address vidAddress,uint amount){
        if (vid[msg.sender][vidAddress].ad!=address(0x0)){
            if (vid[msg.sender][vidAddress].tokens>=amount){
                vid[msg.sender][vidAddress].tokens-=amount;
                balanceOf[msg.sender]-=amount;
                balanceOf[newOwner]+=amount;
                if (vid[newOwner][vidAddress].ad!=address(0x0)){
                    vid[newOwner][vidAddress].tokens+=amount;
                    checkToRemoveVidWith0Balance(vidAddress);
                    ReturnResult("Tokens transferred");
                    return ;
                } else {
                    video memory v;
                    v=vid[msg.sender][vidAddress];
                    v.tokens=amount;
                    vid[newOwner][vidAddress]=v;
                    allVideos[newOwner].push(vidAddress);
                    index[newOwner][vidAddress]=allVideos[newOwner].length-1;
                    checkToRemoveVidWith0Balance(vidAddress);
                    ReturnResult("Tokens transferred");
                    return ;
                }
            }
            ReturnResult("insufficient tokens left");
            return;
        }
        ReturnResult("Video doesn't exist");
        return ;
        
    }
    

}