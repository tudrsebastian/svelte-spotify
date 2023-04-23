<script lang='ts'>

	import { invalidateAll } from "$app/navigation";

</script>



<form method="POST" action='/api/auth/logout' on:submit|preventDefault={async ()=>{
    const response = await fetch(`/api/auth/logout`,{
        method: 'POST',
        headers: {accept:'apllication/json'}
    });
    if(response.ok){
        invalidateAll();
    }
}} >
    <button type="submit">Logout</button>
</form>