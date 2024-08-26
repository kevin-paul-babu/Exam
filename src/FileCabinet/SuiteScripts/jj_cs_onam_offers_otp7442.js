/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/url'],
    /**
     * @param{currentRecord} currentRecord
     *  @param{url} url
     */
    function(currentRecord) {
        
    
         /**
     * Function to be executed after page is initialized.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
     *
     * @since 2015.2
     */
    function pageInit(scriptContext) {
 
        window.onbeforeunload = null
 
    }
        /**
         * Function to be executed when field is changed.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         * @param {string} scriptContext.fieldId - Field name
         * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
         * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
         *
         * @since 2015.2
         */
        
        function fieldChanged(scriptContext) {
            try{
                
                let currObj = currentRecord.get();
                //let checkbox = currObj.getValue('custpage_checkboxpromo');
                let customerId = currObj.getValue('custpage_customername');
            let subsid  = currObj.getValue('custpage_subsidiary');
            if(scriptContext.fieldId ==='custpage_customername'|| scriptContext.fieldId ==='custpage_subsidiary'){
                document.location = url.resolveScript({
                    deploymentId: 'customdeploy_jj_sl_onam_off_otp7442',
                    scriptId: 'customdeploy_jj_sl_onam_off_otp7442',
                    params: {
                        subsidName:subsid||'',
                        custName:customerId||'',
                    }
                })
            };
                
                    // if(checkbox){
                    //     sendEmailCustomer(customerId,checkbox)
                    // }
                    // else{
                    //     alert("No value");
                    // }
    
            }catch(e){
                log.error("error",e.stack)
            }
        }
        // function sendEmailCustomer(customerId){
            
        //     try{
    
    
               
        //             let eBody = '<p>Dear Customer'+'<p>There are Onam Offers in Our Store.Check Out the store.Hurry Up!!!</p>'+'<p>\n</p>';
        //             email.send({
        //                 author: -5,
        //                 body: eBody,
        //                 recipients: customerId,
        //                 subject: "Onam Offers 2024",
        //             })
                
        //        }
        //        catch(e){
        //         log.error("error",e.stack);
        //        }
    
        // }
    
        return { 
            fieldChanged:fieldChanged,
            pageInit:pageInit
    
        };
        
    });
    