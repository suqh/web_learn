<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图 -->
        <el-card>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-input placeholder="请输入参数" v-model="queryInfo.query" clearable @clear="getGoodsList">
                        <el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="goAddPage">添加商品</el-button>
                </el-col>
            </el-row>
            <!-- table 表格区域 -->
            <el-table :data="goodslist" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="goods_name" label="商品名称"></el-table-column>
                <el-table-column prop="goods_price" label="商品价格(元)"></el-table-column>
                <el-table-column prop="goods_weight" label="商品重量"></el-table-column>
                <el-table-column prop="add_time" label="创建时间">
                    <template slot-scope="scope">
                        {{ scope.row.add_time | dateFormat }}
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="goEditPage(scope.row.goods_id)">编辑</el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeById(scope.row.goods_id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页区域 -->
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="queryInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total" background>
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
export default {
    data () {
        return {
            // 查询参数的对象
            queryInfo: {
                query: '',
                pagesize: 10,
                pagenum: 1
            },
            // 总数据条数
            total: 0,
            // 商品列表
            goodslist: []
        }
    },
    created () {
        this.getGoodsList()
    },
    methods: {
        // 根据分页获取对应的商品列表
        async getGoodsList () {
            const { data: res } = await this.$http.get('goods', {
                params: this.queryInfo
            })
            if (res.meta.status !== 200) {
                this.$message.error('获取商品列表失败!')
            }
            this.$message.success('获取商品列表成功!')
            console.log(res.data)

            this.goodslist = res.data.goods

            this.total = res.data.total
            console.log(this.goodslist)
        },
        handleSizeChange (newSize) {
            this.queryInfo.pagesize = newSize
            this.getGoodsList()
        },
        handleCurrentChange (newPage) {
            this.queryInfo.pagenum = newPage
            this.getGoodsList()
        },
        async removeById (goodsId) {
            const confirmResult = await this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => err)
            if (confirmResult !== 'confirm') {
                return this.$message.info('已经取消删除!')
            }
            const { data: res } = await this.$http.delete(`goods/${goodsId}`)
            if (res.meta.status !== 200) {
                return this.$message.error('删除失败!')
            }
            this.$message.success('删除成功!')
            this.getGoodsList()
        },
        goAddPage () {
            this.$router.push('/goods/add')
        },
        goEditPage (id) {
            this.$router.push('/goods/edit/' + id)
        }
    }
}
</script>

<style lang="less" scoped>

</style>