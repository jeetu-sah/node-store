var app = new Vue({
  el: "#pageBody",
  data: {
    category: {
      name: "Hello Vue!",
      description: "Text description Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining ",
      seo_description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining ",
      priority: "1",
      parent_category:null,
    },
    response:{
      status:null,
      msg:null,
    },
    seen: true,
    propertiesSeen: false,
    showStatus:'none',
    categoryListshowStatus:'show',
    inputTypeOption: [
      {label: "Fraction Number Input",value: "fractionNumber" },
      {label: "Complete Number Input",value: "completeNumber" },
      {label: "Text",value: "Text" },
      {label: "Single Select",value: "singleSelect" },
      {label: "Multi Select",value: "multiSelect" },
    ],
    parentCategories:[]
  },
  methods: {
    reverseMessage: function () {
      console.log(this.category);
    },
    showAddNewCategorySection: function () {
      this.showStatus  = '';
      this.categoryListshowStatus  = 'none';
    },
    showCategoryListSection:function (){
      this.categoryListshowStatus  = '';
       this.showStatus  = 'none';
    },
    loadCategory: function () {
        axios.get('/api/v1/category/list')
            .then(response => {
              this.parentCategories = response.data;
            })
            .catch(error => {
               console.log("Something went wrong, Please try after some time");
            })
    },
    parentCategory:function(){
           axios.get('/api/v1/category/parentCategory')
            .then(response => {
              //this.parentCategories = response.data;
            })
            .catch(error => {
               console.log("Something went wrong, Please try after some time");
            })
    },
    showPropertyRow: function () {
      if (this.propertiesSeen == false) {
        this.propertiesSeen = true;
      } else {
        this.propertiesSeen = false;
      }

    },
    submitForm: function () {
      console.log("Submit category form")
        axios.post('/api/v1/category',this.category)
          .then(response  =>{
              this.response.msg = "Category Save successfully"
              this.response.status = 200;
              //update parent category record
              this.loadCategory()
              //hide message success
              setTimeout(()=> { 
                  this.response.msg = null;
                  this.response.status = null;
                 }, 1000);
              console.log(response)
          })
          .catch(error => {
            console.log(error)
          })
          .finally(() =>{
            console.log("loading false");
          })
    }
  },
  mounted(){
    this.loadCategory()
    this.parentCategory()
  }
});
