<template>
    <div>
        <el-dialog :title="ifEdit?'用户修改':'用户新增'" :visible.sync="dialogFormVisible"
                   :before-close="closeDialogAndClearData">
            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item label="姓名" :label-width="formLabelWidth" prop="username">
                    <el-input v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="住址" :label-width="formLabelWidth">
                    <el-input v-model="form.address" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" :label-width="formLabelWidth">
                    <el-input v-model="form.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮件" :label-width="formLabelWidth">
                    <el-input v-model="form.email" autocomplete="off"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialogAndClearData">取 消</el-button>
                <el-button type="primary" @click="submitUser('form')">确 定</el-button>
            </div>
        </el-dialog>

        <el-table
                :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%"
                stripe>
            <el-table-column
                    v-if="hiddenId"
                    prop="id">
            </el-table-column>
            <el-table-column
                    label="UserName"
                    prop="username">
            </el-table-column>
            <el-table-column
                    label="Address"
                    prop="address">
            </el-table-column>
            <el-table-column
                    label="Phone"
                    prop="phone">
            </el-table-column>
            <el-table-column
                    label="Email"
                    prop="email">
            </el-table-column>
            <el-table-column
                    align="right">
                <template slot="header" slot-scope="">
                    <div>
                        <el-button type="success" @click="dialogFormVisible=true">添加用户</el-button>

                    </div>
                </template>
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">Edit
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">Delete
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                rules: {
                    username: [
                        {required: true, message: '请输入用户姓名', trigger: 'blur'}
                    ]
                },
                tableData: [],
                hiddenId: false,
                ifEdit: false,
                search: '',
                dialogFormVisible: false,
                form: {
                    username: "",
                    address: "",
                    phone: "",
                    email: "",
                },
                formLabelWidth: '120px'
            }
        },
        methods: {
            closeDialogAndClearData() {
                this.form = {};
                this.dialogFormVisible = false;
            },
            handleEdit(index, row) {
                console.log(index, row);
                this.ifEdit = true;
                this.form = {
                    id: row.id,
                    username: row.username,
                    address: row.address,
                    phone: row.phone,
                    email: row.email
                }
                this.dialogFormVisible = true;
            },
            submitUser(form) {
                const _this = this;
                const addOrAddUserUrl = 'http://localhost:8081/user';
                _this.$refs[form].validate((valid) => {
                    if (valid) {
                        if (_this.ifEdit) {
                            axios.put(addOrAddUserUrl, _this.form).then(function () {
                                _this.$message({
                                    type: 'success',
                                    message: '修改成功!'
                                });
                                _this.getAllUser();
                                _this.dialogFormVisible = false;
                                _this.closeDialogAndClearData();
                                _this.ifEdit = false;
                            })
                        } else {
                            axios.post(addOrAddUserUrl, _this.form).then(function () {
                                _this.$message({
                                    type: 'success',
                                    message: '添加成功!'
                                });
                                _this.getAllUser();
                                _this.dialogFormVisible = false;
                                _this.closeDialogAndClearData();
                            })
                        }
                    } else {
                        return false;
                    }
                })
            },
            getAllUser() {
                const _this = this;
                const getUserUrl = 'http://localhost:8081/users';
                axios.get(getUserUrl).then(function (response) {
                    _this.tableData = response.data
                });
            },
            handleDelete(index, row) {
                const _this = this;
                console.log(index, row);
                this.$confirm('是否删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const userId = row.id;
                    const deleteUserUrl = 'http://localhost:8081/users/' + userId
                    axios.delete(deleteUserUrl).then(function () {
                        _this.getAllUser();
                        _this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }).catch(() => {
                        _this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            }
        },
        mounted() {
            const _this = this;
            _this.getAllUser();
        }
    }
</script>