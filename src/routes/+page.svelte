<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<input />
<div class='div' />
<select>
    <option>Option</option>
</select>
<button>Button</button>

<style lang="scss">
    div{
        height: 1000px;
    }
    
    h1{
        color:red;
        font-size: functions.toRem(36);
        @include breakpoint.up('md'){
            color:green;
        }
        @include breakpoint.up('lg'){
            color:blue;
        }
    }
</style>