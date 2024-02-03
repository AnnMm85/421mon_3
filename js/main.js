Vue.component('product', {
    template: `

    <div class="drdr">
        <div class="drop-zone"  @drop="onDrop($event, 1)" @dragover.prevent @dragenter.prevent>
                <div class="formZa">
                    <form @submit.prevent="createCard">
                         <div v-if="errors.length">
                             <b>Пожалуйста, исправьте следующие ошибки:</b>
                             <ul>
                               <li v-for="error in errors">{{ error }}</li>
                             </ul>
                        </div>
                         <p>
                           <label for="title">Заголовок:</label>
                           <input id="title" v-model="titleNew" placeholder="Введите заголовок">
                         </p>
                         <p>
                           <label for="desc">Описание задачи:</label>
                           <textarea v-model="descNew"></textarea>
                         </p>
                         <p>
                             <label for="time">Дедлайн: </label>
                             <input id="time" type="time" name="time" v-model="timeNew"/>
                         </p>
                         <p>
                           <input type="submit" value="Submit"> 
                         </p>
                    </form>
                </div>
                <div class="drag-el" v-for="it in listOne" :key="it.id" draggable @dragstart="startDrag($event, it)">
                    <input type="text" v-model="it.title" v-on:keyup.enter="redactCard(it)"> <br><br><br>
                    <textarea v-model="it.desc"v-on:keyup.enter="redactCard(it)"></textarea>
                    <p>Дата: {{it.date}}</p>
                    <p>Дедлайн: {{it.time}}</p>
                    <p><button @click.self="removeCard(it)">Удалить</button></p>
                </div>
        </div>
        <div class="drop-zone"  @drop="onDrop($event, 2)" @dragover.prevent @dragenter.prevent>
                  <div class="drag-el" v-for="it in listTwo" :key="it.id" draggable @dragstart="startDrag($event, it)">
                    <input type="text" v-model="it.title" v-on:keyup.enter="redactCard(it)"> <br><br><br>
                    <textarea v-model="it.desc"v-on:keyup.enter="redactCard(it)"></textarea>
                    <p>Дата: {{it.date}}</p>
                    <p>Дедлайн: {{it.time}}</p>
                    <p v-show="reasonBack">Причина возврата - {{it.back}}</p>
                  </div>
        </div>
        <div class="drop-zone"  @drop="onDrop($event, 3)" @dragover.prevent @dragenter.prevent>
                  <div class="drag-el" v-for="it in listThree" :key="it.id" draggable @dragstart="startDrag($event, it)">
                    <input type="text" v-model="it.title" v-on:keyup.enter="redactCard(it)"> <br><br><br>
                    <textarea v-model="it.desc"v-on:keyup.enter="redactCard(it)"></textarea>
                    <p>Дата: {{it.date}}</p>
                    <p>Дедлайн: {{it.time}}</p>
                  </div>
        </div>
        <div class="drop-zone"  @drop="onDrop($event, 4)" @dragover.prevent @dragenter.prevent>
                  <div class="drag-el" v-for="it in listFour" :key="it.id" draggable @dragstart="startDrag($event, item)">
                    <p>Заголовок: {{ it.title }}</p>
                    <p>Описание : {{ it.desc }}</p>
                    <p>Дата: {{it.date}}</p>
                    <p>Дедлайн: {{it.time}}</p>
                  </div>  
        </div>
    </div>
    `,
    data() {
        return {
            errors: [],
            titleNew: null,
            descNew: null,
            titleRed: null,
            descRed: null,
            timeNew: null,
            reasBack: null,
            reasonBack:false,
            items: [
                {
                    id: 0,
                    title: 'Item A',
                    desc: 'Apple',
                    list: 1,
                    date: new Date().toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"}),
                    time: '20:30',
                },
                {
                    id: 1,
                    title: 'Item B',
                    desc: 'banana',
                    list: 1,
                    date: new Date().toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"}),
                    time: '21:30',
                },
                {
                    id: 2,
                    title: 'Item C',
                    desc: 'cucumber',
                    list: 2,
                    date: new Date().toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"}),
                    time: '22:30',
                },
                {
                    id: 4,
                    title: 'Item D',
                    desc: 'dragon-fruct',
                    list: 3,
                    date: new Date().toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"}),
                    time: '19:30',
                },
                {
                    id: 5,
                    title: 'Item E',
                    desc: 'eilim',
                    list: 4,
                    date: new Date().toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"}),
                    time: '20:30',
                },
            ],
        }
    },
    computed: {
        listOne() {
            return this.items.filter((item) => item.list === 1)
        },
        listTwo() {
            return this.items.filter((item) => item.list === 2)
        },
        listThree() {
            return this.items.filter((item) => item.list === 3)
        },
        listFour() {
            return this.items.filter((item) => item.list === 4)
        },
    },
    mounted() {
        if (localStorage.getItem('items')) {
            try {
                this.items = JSON.parse(localStorage.getItem('items'));
            } catch (e) {
                localStorage.removeItem('items');
            }
        }
    },
    methods: {
        startDrag(evt, item) {
            evt.dataTransfer.dropEffect = 'move'
            evt.dataTransfer.effectAllowed = 'move'
            evt.dataTransfer.setData('itemID', item.id)
        },
        onDrop(evt, list) {
            const itemID = evt.dataTransfer.getData('itemID')
            const item = this.items.find((item) => item.id === itemID)
            switch (item.list) {
                case 1:
                    if (list === 2) {
                        item.list = 2;
                    } else if (list !== 2) {
                        return;
                    }
                    break;
                case 2:
                    if (list == 3) {
                        item.list = 3;
                    } else if (list != 3) {
                        return;
                    }
                    break;
                case 3:
                    if (list == 2) {
                        item.back = prompt('Укажите причину возврата',);
                        this.reasonBack = true;
                        item.list = 2
                    }
                    if (list == 4) {
                        item.list = 4;
                    } else if (list != 4) {
                        return;
                    }
            }
        },
        createCard() {
            if (!this.titleNew || !this.descNew || !this.timeNew) {
                return;
            }
            this.items.push({
                id: Date.now(),
                title: this.titleNew,
                desc: this.descNew,
                list: 1,
                date: new Date().toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"}),
                time: this.timeNew
            });
            this.titleNew = null;
            this.descNew = null;
            this.timeNew = null;
            this.saveItems();
            console.log(Date.now())
        },
        redactCard(it) {
            const index = this.items.indexOf(it);
            this.items.splice(index, 1, {
                id: Date.now(),
                title: it.title,
                desc: it.desc,
                list: it.list,
                date: new Date().toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"}),
                time: it.time
            });
            this.saveItems();
        },
        saveItems() {
            let parseReview = JSON.stringify(this.items);
            localStorage.setItem('items', parseReview);
        },
        removeCard(it) {
            const index = this.items.indexOf(it);
            this.items.splice(index, 1);
            this.saveItems();
        },
    },
})


let app = new Vue({
    el: '#app',

})
