/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/search', 'N/ui/serverWidget','N/email'],
    /**

 * @param{search} search
 * @param{serverWidget} serverWidget
 * @param{email} email
 */
    (search, serverWidget, email) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        function sendEmail(){

        }
        const onRequest = (scriptContext) => {
            try{
                
             
                if(scriptContext.request.method === "GET")
                {

                let form = serverWidget.createForm({
                        title: "Sending Onam Offers",
                    });
                // form.clientScriptFieldId = 522;
               let subsidiary = form.addField({
                    id: "custpage_subsidiary",
                    label: "Subsidiary",
                    type: serverWidget.FieldType.SELECT,
                    source:'subsidiary'
                   });
               let customerName = form.addField({
                    id: "custpage_customername",
                    label: "Customer",
                    type: serverWidget.FieldType.SELECT,
                    source:'customer'
                   });
                let subList = form.addSublist({
                    id: 'custpage_sublist',
                    label: 'Details',
                    type: serverWidget.SublistType.LIST
                });
                   subList.addField({
                        id:"custpage_customer",
                        label:"Customer Name",
                        type: serverWidget.FieldType.TEXT,
                    });
            
                    subList.addField({
                        id:"custpage_email",
                        label:"Customer Email",
                        type: serverWidget.FieldType.EMAIL
                    }); 

                    subList.addField({
                        id: "custpage_totatlinvoiceamount",
                        label:"Total Invoice Amount",
                        type: serverWidget.FieldType.FLOAT
                    });
                    subList.addField({
                        id: "custpage_checkboxpromo",
                        label:"Send Promotion",
                        type: serverWidget.FieldType.CHECKBOX
                    });
                    form.addSubmitButton({
                        label: "Send Email"
                    });

                    let custName = scriptContext.request.parameters.custpage_customername || '';
                    let subsidName  = scriptContext.request.parameters.custpage_subsidiary || '';
                    subsidiary.defaultValue = subsidName;
                    customerName.defaultValue = custName;


                        let invObj = search.create({
                            type: search.Type.INVOICE,
                            filters: [["trandate","onorafter","1/1/2024"],"AND",['mainline','is','T'],"AND",["amount","greaterthan","1000.00"]],
                            columns: [ 
                             search.createColumn({
                                name: "entity",
                                summary: "GROUP",
                                label: "Name"
                             }),
                             search.createColumn({
                                name: "email",
                                join: "customer",
                                summary: "GROUP",
                                label: "Email"
                             }),
                             search.createColumn({
                                name: "amount",
                                summary: "SUM",
                                label: "Amount"
                             })]
                        });
                        let results = invObj.run().getRange({
                            start:0,
                            end:1000
                        });
                        let details;
                        results.forEach(function(result){
                            details = {
                                name:result.getText(invObj.columns[0]),
                                email:result.getValue(invObj.columns[1]),
                                amt:result.getValue(invObj.columns[2])
                            }
                           
                            log.debug(details.name);
                            return true;
                        });
                        
                     
                        for(let i=0; i<details.length; i++){
                                subList.setSublistValue({
                                    id: "custpage_customer",
                                    line: i,
                                    value: results[i].getValue({ name: 'entity', summary:'GROUP'})
                                      });
                                subList.setSublistValue({
                                    id: "custpage_email",
                                    line: i,
                                    value:details.email
                                      });
                                subList.setSublistValue({
                                    id: "custpage_totatlinvoiceamount",
                                    line: i,
                                    value:details.amt
                                      });
                        }
                      scriptContext.response.writePage(form);
                 
                        
                    }
                       

                     
                    
                
                

            }catch(e){
                log.error("error",e.stack)
            }
        }

        return {onRequest}

    });
