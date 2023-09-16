import React ,{useState,useEffect} from "react";
import Chart from 'chart.js/auto'
import { useParams } from 'react-router-dom';
function Monitoring()
{
    const { vmName } = useParams();
    const azureAuthToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL21hbmFnZW1lbnQuY29yZS53aW5kb3dzLm5ldC8iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9kYmQ2NjY0ZC00ZWI5LTQ2ZWItOTlkOC01YzQzYmExNTNjNjEvIiwiaWF0IjoxNjg1NjExMTYwLCJuYmYiOjE2ODU2MTExNjAsImV4cCI6MTY4NTYxNTM3MiwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhUQUFBQTZVbnF3OXBLZGxsbnRkQ2szUzJvTm41dGUvR0ZJTVZhd0hOMnppWW4zeXhybHUzcmFRb2xSZDRPYk0zZC9DM24iLCJhbXIiOlsicHdkIl0sImFwcGlkIjoiMDRiMDc3OTUtOGRkYi00NjFhLWJiZWUtMDJmOWUxYmY3YjQ2IiwiYXBwaWRhY3IiOiIwIiwiZ3JvdXBzIjpbImY1MDU3OGRiLTczYjctNGMzOC05MDAwLTA5MWY4OGQxNjZlNCJdLCJpcGFkZHIiOiIxNTQuMTA3LjIyOC4xNjMiLCJuYW1lIjoibG91YXlraHJvdWYiLCJvaWQiOiI3ZWIzNjhjZC0wM2JiLTQ1ZmYtYjRiOC1lMjE1NGFkZGI2ZjkiLCJwdWlkIjoiMTAwMzIwMDA0RkRBMTYzMiIsInJoIjoiMC5BUjhBVFdiVzI3bE82MGFaMkZ4RHVoVThZVVpJZjNrQXV0ZFB1a1Bhd2ZqMk1CTWZBRzguIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic3ViIjoiVnMxbFRQLU16QWRLMmxtTVlMa3FjRGFFX1g3ZFREb0Jkem1UM3VJV0VHSSIsInRpZCI6ImRiZDY2NjRkLTRlYjktNDZlYi05OWQ4LTVjNDNiYTE1M2M2MSIsInVuaXF1ZV9uYW1lIjoibG91YXlraHJvdWZAaW5zYXQudS1jYXJ0aGFnZS50biIsInVwbiI6ImxvdWF5a2hyb3VmQGluc2F0LnUtY2FydGhhZ2UudG4iLCJ1dGkiOiI4d2NRQjNFRU9FTzczV29jVTQtUkFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXSwieG1zX2NjIjpbIkNQMSJdLCJ4bXNfdGNkdCI6MTUwNDAxMjQ1Nn0.Mj1xggMpAqup-XeIcrVToi9MfBQfdyJ7yDp0LDkJQxPElApXVW1c-wqCUFo7j4xcpATUPXUGBlt9WjvCktGifnlP2tBfcOcgo0Yf0QHWpvoTeaEKOCqy-eiIj72sKPf7SgTYdrefYZ0R0P8Lw_p-Ru5JSs2HsOYsqejzMmruOx1euj-RTfwHhv--8eonrpBW1aHbq7XjOX45ZwdyHCEe3pELWX731e72wJ1cLrsY_4QwSjUS9b5SSsuPyW2F8hWTaOfQUxZXXe2eXy8qnysLdoEPe68SV4-nUoNMqvYgUu5iD2Gbqa0emTlskPywGXS5Np-psDIEEuvB7gie0ewR0Q';

    var apiResponse = [];
    //const [apiResponse, setApiResponse] = useState([]);
   
       setInterval(() => {
         fetchAPIresponse();
      }, 2000);

     
   
   
   const fetchAPIresponse=()=>{
      const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL21hbmFnZW1lbnQuY29yZS53aW5kb3dzLm5ldC8iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9kYmQ2NjY0ZC00ZWI5LTQ2ZWItOTlkOC01YzQzYmExNTNjNjEvIiwiaWF0IjoxNjg1NjExMTYwLCJuYmYiOjE2ODU2MTExNjAsImV4cCI6MTY4NTYxNTM3MiwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhUQUFBQTZVbnF3OXBLZGxsbnRkQ2szUzJvTm41dGUvR0ZJTVZhd0hOMnppWW4zeXhybHUzcmFRb2xSZDRPYk0zZC9DM24iLCJhbXIiOlsicHdkIl0sImFwcGlkIjoiMDRiMDc3OTUtOGRkYi00NjFhLWJiZWUtMDJmOWUxYmY3YjQ2IiwiYXBwaWRhY3IiOiIwIiwiZ3JvdXBzIjpbImY1MDU3OGRiLTczYjctNGMzOC05MDAwLTA5MWY4OGQxNjZlNCJdLCJpcGFkZHIiOiIxNTQuMTA3LjIyOC4xNjMiLCJuYW1lIjoibG91YXlraHJvdWYiLCJvaWQiOiI3ZWIzNjhjZC0wM2JiLTQ1ZmYtYjRiOC1lMjE1NGFkZGI2ZjkiLCJwdWlkIjoiMTAwMzIwMDA0RkRBMTYzMiIsInJoIjoiMC5BUjhBVFdiVzI3bE82MGFaMkZ4RHVoVThZVVpJZjNrQXV0ZFB1a1Bhd2ZqMk1CTWZBRzguIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic3ViIjoiVnMxbFRQLU16QWRLMmxtTVlMa3FjRGFFX1g3ZFREb0Jkem1UM3VJV0VHSSIsInRpZCI6ImRiZDY2NjRkLTRlYjktNDZlYi05OWQ4LTVjNDNiYTE1M2M2MSIsInVuaXF1ZV9uYW1lIjoibG91YXlraHJvdWZAaW5zYXQudS1jYXJ0aGFnZS50biIsInVwbiI6ImxvdWF5a2hyb3VmQGluc2F0LnUtY2FydGhhZ2UudG4iLCJ1dGkiOiI4d2NRQjNFRU9FTzczV29jVTQtUkFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXSwieG1zX2NjIjpbIkNQMSJdLCJ4bXNfdGNkdCI6MTUwNDAxMjQ1Nn0.Mj1xggMpAqup-XeIcrVToi9MfBQfdyJ7yDp0LDkJQxPElApXVW1c-wqCUFo7j4xcpATUPXUGBlt9WjvCktGifnlP2tBfcOcgo0Yf0QHWpvoTeaEKOCqy-eiIj72sKPf7SgTYdrefYZ0R0P8Lw_p-Ru5JSs2HsOYsqejzMmruOx1euj-RTfwHhv--8eonrpBW1aHbq7XjOX45ZwdyHCEe3pELWX731e72wJ1cLrsY_4QwSjUS9b5SSsuPyW2F8hWTaOfQUxZXXe2eXy8qnysLdoEPe68SV4-nUoNMqvYgUu5iD2Gbqa0emTlskPywGXS5Np-psDIEEuvB7gie0ewR0Q';
      const resourceGroupName = `${vmName}-resource-group`;
      const subscription_id=localStorage.getItem("subscription_id");
      const options = {
        headers: {
          Authorization: `Bearer ${azureAuthToken}`,
        },
      };
      
      fetch(
        `https://management.azure.com//subscriptions/${subscription_id}/resourceGroups/${resourceGroupName}/providers/Microsoft.Compute/virtualMachines/${vmName}/providers/Microsoft.Insights/metrics?&metricnames=Percentage CPU,Network In,Network Out,Available Memory Bytes,CPU Credits Consumed,CPU Credits Remaining,Disk Read Bytes,Disk Write Bytes&api-version=2018-01-01`,
        options
      )
        .then((response) => response.json())
        .then((data) => {console.log(data)
            //setApiResponse(data);
            apiResponse=data;
          
        }
      )
        .catch((error) => console.log(error));
   
        console.log(apiResponse);
        (async function() {
          console.log(apiResponse.keys);
          const data = apiResponse.value[0].timeseries[0].data;

         
             new Chart(
               document.getElementById('acquisitions'),
               {
                 type: 'line',
                 options: {
                    responsive: true,
                    plugins: {
                      title: {
                        display: true,
                        text: 'CPU USAGE'
                      },
                    }},
                    interaction: {
                        intersect: false,
                      },
                 data: {
                   labels: data.map(row => row.timeStamp.substring(row.timeStamp.lastIndexOf("T")+1,row.timeStamp.length-1)),
                   datasets: [
                     {
                       label: 'Average by timestamp',
                       data: data.map(row => row.average)
                     }
                   ]
                 }
                 
               }

             );
           })();
           (async function() {
            console.log(apiResponse.keys);
            const data = apiResponse.value[3].timeseries[0].data;
  
           
               new Chart(
                 document.getElementById('acquisitions1'),
                 {
                   type: 'line',
                   options: {
                      responsive: true,
                      plugins: {
                        title: {
                          display: true,
                          text: 'Available Memory Bytes'
                        },
                      }},
                      interaction: {
                          intersect: false,
                        },
                   data: {
                     labels: data.map(row => row.timeStamp.substring(row.timeStamp.lastIndexOf("T")+1,row.timeStamp.length-1)),
                     datasets: [
                       {
                         label: 'Average by timestamp',
                         data: data.map(row => row.average)
                       }
                     ]
                   }
                   
                 }
  
               );
             })();
   };

   
   
   return(<>
    
    <div className="monitoring"><canvas id="acquisitions"></canvas></div>
    <div className="monitoring1"><canvas id="acquisitions1"></canvas></div>

   
    </>)
}
export default Monitoring