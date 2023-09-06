import './Dashboard.css'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function Sidebar()
{   const navigate = useNavigate();
    const [rgs, setRgs] = useState([]);
    const azureAuthToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL21hbmFnZW1lbnQuY29yZS53aW5kb3dzLm5ldC8iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9kYmQ2NjY0ZC00ZWI5LTQ2ZWItOTlkOC01YzQzYmExNTNjNjEvIiwiaWF0IjoxNjg1NjExMTYwLCJuYmYiOjE2ODU2MTExNjAsImV4cCI6MTY4NTYxNTM3MiwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhUQUFBQTZVbnF3OXBLZGxsbnRkQ2szUzJvTm41dGUvR0ZJTVZhd0hOMnppWW4zeXhybHUzcmFRb2xSZDRPYk0zZC9DM24iLCJhbXIiOlsicHdkIl0sImFwcGlkIjoiMDRiMDc3OTUtOGRkYi00NjFhLWJiZWUtMDJmOWUxYmY3YjQ2IiwiYXBwaWRhY3IiOiIwIiwiZ3JvdXBzIjpbImY1MDU3OGRiLTczYjctNGMzOC05MDAwLTA5MWY4OGQxNjZlNCJdLCJpcGFkZHIiOiIxNTQuMTA3LjIyOC4xNjMiLCJuYW1lIjoibG91YXlraHJvdWYiLCJvaWQiOiI3ZWIzNjhjZC0wM2JiLTQ1ZmYtYjRiOC1lMjE1NGFkZGI2ZjkiLCJwdWlkIjoiMTAwMzIwMDA0RkRBMTYzMiIsInJoIjoiMC5BUjhBVFdiVzI3bE82MGFaMkZ4RHVoVThZVVpJZjNrQXV0ZFB1a1Bhd2ZqMk1CTWZBRzguIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic3ViIjoiVnMxbFRQLU16QWRLMmxtTVlMa3FjRGFFX1g3ZFREb0Jkem1UM3VJV0VHSSIsInRpZCI6ImRiZDY2NjRkLTRlYjktNDZlYi05OWQ4LTVjNDNiYTE1M2M2MSIsInVuaXF1ZV9uYW1lIjoibG91YXlraHJvdWZAaW5zYXQudS1jYXJ0aGFnZS50biIsInVwbiI6ImxvdWF5a2hyb3VmQGluc2F0LnUtY2FydGhhZ2UudG4iLCJ1dGkiOiI4d2NRQjNFRU9FTzczV29jVTQtUkFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXSwieG1zX2NjIjpbIkNQMSJdLCJ4bXNfdGNkdCI6MTUwNDAxMjQ1Nn0.Mj1xggMpAqup-XeIcrVToi9MfBQfdyJ7yDp0LDkJQxPElApXVW1c-wqCUFo7j4xcpATUPXUGBlt9WjvCktGifnlP2tBfcOcgo0Yf0QHWpvoTeaEKOCqy-eiIj72sKPf7SgTYdrefYZ0R0P8Lw_p-Ru5JSs2HsOYsqejzMmruOx1euj-RTfwHhv--8eonrpBW1aHbq7XjOX45ZwdyHCEe3pELWX731e72wJ1cLrsY_4QwSjUS9b5SSsuPyW2F8hWTaOfQUxZXXe2eXy8qnysLdoEPe68SV4-nUoNMqvYgUu5iD2Gbqa0emTlskPywGXS5Np-psDIEEuvB7gie0ewR0Q';
    const [vms,setVms] = useState([]);
    const handleVmClick = (vmName) => {
        navigate(`/vms/${vmName}`);
      };
      const extractVmName = (resourceGroupName) => {
        return resourceGroupName.substring(0, resourceGroupName.lastIndexOf("-resource-group"));
      };
    useEffect(() => {
      const subscriptionId=localStorage.getItem("subscription_id");
      //const resourceGroupName = 'pfa';
      const apiVersion = '2021-04-01';
      const apiEndpoint = `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups?api-version=${apiVersion}`;
            const requestOptions = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${azureAuthToken}`,
          'Content-Type': 'application/json'
        }
      };
  
      fetch(apiEndpoint, requestOptions)
        .then(response => response.json())
        .then(data => {
          setRgs(data.value|| []);
        })
        .catch(error => {
          console.error(error);
        });
    }, []);
    useEffect(() => {
      const subscriptionId = '94bdf75f-0db0-45e0-bb43-ff113d14ea1f';
     // const azureAuthToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL21hbmFnZW1lbnQuY29yZS53aW5kb3dzLm5ldC8iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9kYmQ2NjY0ZC00ZWI5LTQ2ZWItOTlkOC01YzQzYmExNTNjNjEvIiwiaWF0IjoxNjg1MzgzODM3LCJuYmYiOjE2ODUzODM4MzcsImV4cCI6MTY4NTM4ODU3MywiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhUQUFBQWpYZjg0YTRRT2hITmU5eFRBNHlsZ1pUR1p1WGNPY3daUTRDUDFwWTh1TEE2RERlMlU0WmhuYnlPaUN1Q21vZTQiLCJhbXIiOlsicHdkIl0sImFwcGlkIjoiMDRiMDc3OTUtOGRkYi00NjFhLWJiZWUtMDJmOWUxYmY3YjQ2IiwiYXBwaWRhY3IiOiIwIiwiZ3JvdXBzIjpbImY1MDU3OGRiLTczYjctNGMzOC05MDAwLTA5MWY4OGQxNjZlNCJdLCJpcGFkZHIiOiIxOTcuMTYuMTY0LjExIiwibmFtZSI6ImxvdWF5a2hyb3VmIiwib2lkIjoiN2ViMzY4Y2QtMDNiYi00NWZmLWI0YjgtZTIxNTRhZGRiNmY5IiwicHVpZCI6IjEwMDMyMDAwNEZEQTE2MzIiLCJyaCI6IjAuQVI4QVRXYlcyN2xPNjBhWjJGeER1aFU4WVVaSWYza0F1dGRQdWtQYXdmajJNQk1mQUc4LiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInN1YiI6IlZzMWxUUC1NekFkSzJsbU1ZTGtxY0RhRV9YN2RURG9CZHptVDN1SVdFR0kiLCJ0aWQiOiJkYmQ2NjY0ZC00ZWI5LTQ2ZWItOTlkOC01YzQzYmExNTNjNjEiLCJ1bmlxdWVfbmFtZSI6ImxvdWF5a2hyb3VmQGluc2F0LnUtY2FydGhhZ2UudG4iLCJ1cG4iOiJsb3VheWtocm91ZkBpbnNhdC51LWNhcnRoYWdlLnRuIiwidXRpIjoiUy1kY21KUXp1VU9sdGFKSkprRkhBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19jYyI6WyJDUDEiXSwieG1zX3RjZHQiOjE1MDQwMTI0NTZ9.FQBSUgd-1FZwA221EriZUjX2I0zFSJodead0LB6vDxlx9lyJU0ClV1ez8yBzW17ReUNl2derCwK486o1E7p-O7LctrxcvU8--fbOq0eI1khEFtXOhJuHuorVqdrEjZrI37S2LizcPRGD-hroytpkb5RBXtPnW3m8kVSnicpK1e-9WbuC8HHbsB4bs1YQv4Vk680ncSrVmpTsA3k8LOcr_F487vRyafrTyQ1cIXAkWa5T7YsipHE40IQ5XHIKA2W-Vfc7noFNBuEYOFG179ATuCZn0FWKzzD1leiImqQFOybalzkgmYRkPH7nW9xmLxN9wIY1c_ZWFCu-hTJEKm3tjw';
      const apiVersion = '2021-04-01';

      //const resourceGroupName = 'pfa';
      rgs.forEach(rg =>{
        const apiEndpoint = `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${rg.name}/providers/Microsoft.Compute/virtualMachines?api-version=${apiVersion}`;
        const requestOptions = {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${azureAuthToken}`,
            'Content-Type': 'application/json'
          }
        };
        fetch(apiEndpoint, requestOptions)
        .then(response => response.json())
        .then(data => {
          setVms(data.value|| []);
        })
        .catch(error => {
          console.error(error);
        });
      })
    }, []);
    return(
        <>
<aside id="sidebar" class="sidebar">

<ul class="sidebar-nav" id="sidebar-nav">

  <li class="nav-item">
    <a class="nav-link " href="/Dashboard">
      <i class="bi bi-grid"></i>
      <span>Dashboard</span>
    </a>
  </li>
  <li class="nav-item">
    <a class="nav-link " data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
      <i class="bi bi-menu-button-wide"></i><span>VM list</span><i class="bi bi-chevron-down ms-auto"></i>
    </a>
    
    <ul id="components-nav" class="nav-content  " data-bs-parent="#sidebar-nav">
      <li>
        <a href="components-alerts.html">
          <i class="bi bi-circle"></i><span></span>
        </a>
      </li>
 
      {rgs.map(rg => (
          <div key={rg.id} >
            <ul>
              <li className="container" >
                <div className="details">
                  <div class="row align-items-start ligne1">
                    <div class="col ">
                    <a href="#" onClick={() => handleVmClick(extractVmName(rg.name))}>
                    <i></i><span>{extractVmName(rg.name)}</span>
                    
            </a>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        ))}
    
   
     
     
      
      
      
    </ul>
  </li>


  



 
 

</ul>

</aside>
        </>
    )
}
export default Sidebar