<template>
    <div>
        <input type="text" :value="inputData"/>
        <input type="button" value="提交" />
    </div>
</template>
<script>
    export default {
        data() {
            return {
                inputData:'我是测试哦'
            }
        }
    }
</script>
