import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

@Injectable()
export class CrudStorageProvider {
    private KEY: string = 'market_survey';
    private ATTACH_KEY: string = 'attach_file';
    data: any = [];
    dataAttachFile : any = [];
    private OLD_KEY: string = 'notes';
    itemAttachFile = {};

    constructor(private storage: Storage) {}

    get read() {
        return this.storage.get(this.OLD_KEY).then((val) => {
            if (val && val.length > 0)
                this.data = val;
            else 
                this.data = [];

            return this.data;
        });
    }

    readAllData(created_by) {
        return this.storage.get(this.KEY).then((val) => {
            if (val && val.length > 0){
                for(let i = 0; i < val.length; i++){
                    if(val[i].created_by == created_by){
                        this.data = val;
                    }
                }
            } else {
                this.data = [];
            }

            return this.data;
        });
    }

    readAllDataAttachFile() {
        return this.storage.get(this.ATTACH_KEY).then((val) => {
            if (val && val.length > 0)
                this.dataAttachFile = val;
            else 
                this.dataAttachFile = [];

            return this.dataAttachFile;
        });
    }

    deleteAllData(){
        this.storage.remove(this.KEY);
    }

    create(data, action: any = 1){
        if(action == 2) this.update(data);
        else this.data.push(data);
        return this.save();
    }

    delete(data) {
        for (let i in this.data) {
            if (this.data[i].token == data.token && this.data[i].survey_date == data.survey_date && this.data[i].id_objective_location == data.id_objective_location && this.data[i].created_by == data.created_by ) {
            this.data.splice(parseInt(i), 1);
            break;
          }
        }
        return this.save();
    }

    update(data){
        for (let i in this.data) {
            if (this.data[i].token == data.token && this.data[i].survey_date == data.survey_date && this.data[i].id_objective_location == data.id_objective_location && this.data[i].created_by == data.created_by ) {
                this.data[i] = data;
                break;
            }
        }
        return this.save(); 
    }

    save() {
        return this.storage.set(this.KEY, this.data);
    }

    getDataMarketSurveyByAttachFile(data){
        let item = [];
        this.storage.get(this.ATTACH_KEY).then((res) => {
            for (let i in res) {
                if (res[i].token == data.token && res[i].survey_date == data.survey_date && res[i].id_objective_location == data.id_objective_location && res[i].created_by == data.created_by ) {
                    item[0] = res[i];
                    break;
                }
            }
        });
        return item;
    }

    getDataMarketSurveyAttachFile(data){
        
        this.storage.get(this.ATTACH_KEY).then((res) => {
            for (let i in res) {
                if (res[i].token == data.token && res[i].survey_date == data.survey_date && res[i].id_objective_location == data.id_objective_location && res[i].created_by == data.created_by ) {
                    this.itemAttachFile = {
                        category : res[i].category,
                        id_objective_location : res[i].id_objective_location,
                        pic_blob : res[i].pic_blob,
                        remark : res[i].remark,
                        survey_date : res[i].survey_date,
                        token : res[i].token,
                        file_name : res[i].file_name,
                        id_market_survey : res[i].id_market_survey,
                        created_by : res[i].created_by,
                    };
                    break;
                }
            }
        });
        return this.itemAttachFile;
    }

    updateAttachFile(data){
        for (let i in this.dataAttachFile) {
            if (this.dataAttachFile[i].token == data.token && this.dataAttachFile[i].survey_date == data.survey_date && this.dataAttachFile[i].id_objective_location == data.id_objective_location && this.dataAttachFile[i].created_by == data.created_by ) {
                this.dataAttachFile[i] = data;
                break;
            }
        }
        return this.saveAttach();
    }

    createAttach(data, action) {
        if(action == 2) this.updateAttachFile(data);
        else this.dataAttachFile.push(data);
        return this.saveAttach();
    }

    saveAttach(){
        return this.storage.set(this.ATTACH_KEY, this.dataAttachFile);
    }

    getData(){
        return this.storage.get(this.KEY).then((data) => {
            return data;
        });
    }

    getUserLogin(){
        return this.storage.get('users').then((data) => {
            return data;
        });
    }

}
