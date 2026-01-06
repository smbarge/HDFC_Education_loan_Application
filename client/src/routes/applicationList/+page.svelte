<script>
    import { onMount } from "svelte";
    
    let Data = [
    {
        "srNo":1,
        "Name": "Ahmed Khan Pathan",
        "Gender": "Male",
        "Mobile": "9575792323",
        "Date": "20-07-2024",
        "LoanAmount": "100,000",
        "Status": "Approved"
    },
    {
        "srNo":2,
        "Name": "Fatima Begum Shaikh",
        "Gender": "Female",
        "Mobile": "9847654321",
        "Date": "19-07-2024",
        "LoanAmount": "50,000",
        "Status": "Pending"
    },
    {
        "srNo":3,
        "Name": "Salma Bano Mirza",
        "Gender": "Female",
        "Mobile": "9987654321",
        "Date": "19-07-2024",
        "LoanAmount": "50,000",
        "Status": "Approved"
    },
    {
        "srNo":4,
        "Name": "John D'Souza",
        "Gender": "male",
        "Mobile": "9487654321",
        "Date": "19-07-2024",
        "LoanAmount": "50,000",
        "Status": "Pending"
    },
    {
        "srNo":5,
        "Name": "Peter Rodrigues",
        "Gender": "male",
        "Mobile": "9787654321",
        "Date": " 19-07-2024",
        "LoanAmount": "50,000",
        "Status": "Approved"
    },
    
    ]
    
    let searchQuery = '';
    let filteredData = [];
    
    // Function to filter data based on the search query
    const filterData = () => {
        filteredData = Data.filter(item => 
        item.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Gender.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Mobile.includes(searchQuery) ||
        item.Date.includes(searchQuery) ||
        item["LoanAmount"].includes(searchQuery) ||
        item.Status.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };
    
    // Run filterData on component mount and when searchQuery changes
    onMount(() => {
        filterData();
    });
    
    $: filterData(); // Re-run filterData whenever searchQuery changes
    
</script>


<div class="bg-gray-100 h-screen">
    <!-- <div class="p-10">
        <img src="/logo.png" alt="">
    </div> -->
    <!-- <div class="bg-violet-800 py-4">
    </div> -->
    <div class="mx-10">
        
        <div class="flex py-5 text-2xl font-bold gap-5 items-center">
            <div class="">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
                
            </div>
            <div class="">
                Applicant List
            </div>
            
        </div>
        <div class="bg-white border-2 border-gray-300 p-5 grid gap-5">
            <div class="bg-white rounded-lg shadow-md items-center p-5 flex justify-between">
                
                <div class="rounded-md border border-gray-300 p-4 w-96 flex items-center justify-between">
                    <input
                    type="text"
                    bind:value={searchQuery}
                    placeholder="Search..."
                    />   
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    
                </div>
                <div class="flex gap-5 text-white">
                    <button class="bg-violet-600 px-8 py-1 rounded-md">
                        Export to XLS
                        
                    </button>
                    <button  class="bg-violet-600 px-8 py-1 rounded-md">
                        Export to PDF
                        
                    </button>
                </div>
                
            </div>
            <div class="bg-white rounded-lg shadow-md p-5">
                
                <div class=" grid grid-cols-12 text-gray-700 font-bold text-xl text-center items-start justify-center py-5">
                    <div class="col-span-1">
                        Sr No.
                    </div>
                    <div class="col-span-3 text-left">
                        Name Of Applicant
                    </div>
                    <div class="col-span-1">
                        Gender
                    </div>
                    <div class="col-span-2">
                        Mobile
                    </div>
                    <div class="col-span-2">
                        Date
                    </div>
                    <div class="col-span-1 mr-10 text-right">
                        Loan Ammount
                        <div>
                            ₹
                        </div>
                    </div>
                    <div class="col-span-1">
                        Status
                    </div>
                    <div class="col-span-1">
                        Edit
                    </div>
                    
                </div>
                
                {#each Data as data}
                <div class=" grid grid-cols-12 text-gray-500 font-bold text-lg text-center items-center justify-center py-5 border-t border-gray-300">
                    <div class="col-span-1">
                        {data.srNo}
                    </div>
                    <div class="col-span-3 text-left">
                        {data.Name}
                    </div>
                    <div class="col-span-1">
                        {data.Gender}
                    </div>
                    <div class="col-span-2">
                        {data.Mobile}
                    </div>
                    <div class="col-span-2">
                        {data.Date}
                    </div>
                    <div class="col-span-1 mr-10 text-right">
                        {data.LoanAmount}
                    </div>
                    <div class="col-span-1">
                        {data.Status}
                    </div>
                    <div class="col-span-1 flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                        
                    </div>
                    
                </div>
                {/each}
                
            </div>
            
        </div>
    </div>
    
    
    
</div>