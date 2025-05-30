<script setup>
import HomeList from './components/home-list.vue'
import DemandHomeList from './components/demand-homeList.vue'
import Blockchain from './components/blockchain.vue'
import ProductionPartner from './components/production-partner.vue'
import HomeDesign from './components/home-design.vue'
import Logistics from './components/logistics.vue'
import Fashion from './components/fashion.vue'
import Supplier from './components/supplier.vue'
</script>

<template>
    <div>
        <DemandHomeList />
        <Blockchain />
        <ProductionPartner />
        <HomeDesign />
        <Supplier />
        <Logistics />
        <Fashion />
        <HomeList />
    </div>
</template>



<style lang="scss" scoped>

</style>