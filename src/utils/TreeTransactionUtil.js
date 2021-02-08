/* eslint-disable no-unused-vars */
/******************************************
 *  Author : Suraj Sharma
 *  Created On : Thu Jan 28 2021
 *  File : TreeTransactionUtil.js
 *******************************************/
/**
 * Since we are taking transactions from api which are not biased on the
 * tree count available.
 * In our app we are using the tree count in the transactions to give user
 * available transactions 
 * 
 * @param Object{
 *  panacea: [...],
 * sustainable_meeting: [...]
 * }
 * 
 * @returns {
 *   "1": {
 *       "sustainable_meeting": [
 *           {id: 6, transaction_guid: "6922fb3a-03ca-45b4-8148-55441ddbc9c6-1", email: "test@gmail.com",…},
 *       ],
 *       "panacea": [
 *           {id: 6, transaction_guid: "6922fb3a-03ca-45b4-8148-55441ddbc9c6-1", email: "test@gmail.com",…},            
 *       ]
 *   },
 *   "2": [...],
 *   } 
 */

 const TreeTransaction = (apiData, parsedTransactions = {}) => new Promise((resolve, reject)=>{
		// if the apiData array is empty that means all elment has been organized
        // time to resolve the promise
        // since apiData is object we have to check if all the data for each key entries
        // are empty
        const panaceaSize = apiData.panacea.length;
        const sustainableMeetingSize = apiData.sustainable_meeting.length;
        // console.log(apiData, panaceaSize, sustainableMeetingSize);
        if(panaceaSize > 0 || sustainableMeetingSize > 0){
            /**
             * Get first data from each Object sustainable_meeting and panacea
             * and check if the remaining_tree_count for panacea and tree_count for sustainable_meeting
             * are in sorted order
             */
            const panaceaElement = apiData.panacea[0] || null;
            const sustainableElement = apiData.sustainable_meeting[0] || null;
            
            // first panacea
            if(panaceaElement){
                const pTreeCount = panaceaElement.remaining_tree_count;
                // after getting treeCount, check if it's value already exists in parsedTransactions
                // else add the treeCount as a key in the parsedTransactions Object and with element pushed
                // as first value or push it into appropriate treeCounts appropriate category
                if(pTreeCount in parsedTransactions){
                    parsedTransactions[pTreeCount].panacea.push(panaceaElement);
                }else{
                    // create an object key in parsedTransactions
                    Object.assign(parsedTransactions, {[pTreeCount]: {
                        sustainable_meeting: [],
                        panacea: [panaceaElement]                    
                    }});
                }

                 // remove first element from panacea Array
                 apiData.panacea.shift();
            }

            // second sustainable_meeting
            if(sustainableElement){
                const sTreeCount = sustainableElement.tree_count;
                // after getting treeCount, check if it's value already exists in parsedTransactions
                // else add the treeCount as a key in the parsedTransactions Object and with element pushed
                // as first value or push it into appropriate treeCounts appropriate category                
                if(sTreeCount in parsedTransactions){
                    parsedTransactions[sTreeCount].sustainable_meeting.push(sustainableElement);
                }else{
                    // create an object key in parsedTransactions
                    Object.assign(parsedTransactions, {[sTreeCount]: {
                        sustainable_meeting: [sustainableElement],
                        panacea: []                    
                    }});
                }
                 // remove first element from sustainable_meeting Array
                 apiData.sustainable_meeting.shift();                
            }

            // remove first element each from
            TreeTransaction(apiData, parsedTransactions)
            .then((res)=> resolve(res))
        }else{
            resolve(parsedTransactions);
        }
    });

export default TreeTransaction;

