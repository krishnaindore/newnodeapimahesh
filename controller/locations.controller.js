const { default: mongoose } = require('mongoose');
const locationModel = require('../model/locationModel')

exports.add = async (req, res) => {

     const { state  , firstPara ,locationTitle, secondPara, locationType  , locationDescription } = req.body;
console.log("body:", req.body);
console.log("files:", req.files);

if (!req.files || req.files.length === 0) {
  return res.json({
    status: false,
    
    message: `Please select image(s)`,
  });   
}



    const displayPhotosCara = req.files['caraImgLocation'].map(file => file.filename);  
    const displayPhotosLocation = req.files['locationImg'].map(file => file.filename);  

    console.log("displayPhotosCara:", displayPhotosCara);
console.log("displayPhotosLocations:", displayPhotosLocation[0]);

if (state) {
     const datas = await locationModel.find({ state: state });
   
     if (datas.length > 0) {
       
       const firstData = datas[0];
   
      
       const newLocation = {
         locationType,
         locationImg: displayPhotosLocation[0],
         locationDescription,
         locationTitle,
       };
   
      
       firstData.exactLocation.push(newLocation);
   
       
       await firstData.save();
       return res.status(200).json({ message: 'Document saved successfully' });
     }
   }
   

const newLocation = new locationModel({    

 
     state ,
     caraImgLocation: displayPhotosCara , 
     
      firstPara ,
       secondPara, 
       exactLocation:[{
       locationType ,
        locationImg :  displayPhotosLocation[0],
         locationDescription,
         locationTitle
       }]
});

newLocation.save()
  .then(() => {
    return res.json({
      status: true,
      message: `Location saved successfully`,
    });
  })
  .catch((error) => {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: `Error saving location`,
    });
  });

};
exports.getByState = async (req, res) => {
     const  {state}  = req.params;
     console.log(state)
     await locationModel.find({ state: state })
          .then((success) => {
               return res.json({
                    status: true,
                    message: "all locations",
                    data: success
               })
          })
          .catch((error) => {
               return res.json({
                    status: true,
                    message: "something went wrong",
                    data: error
               })
          })
}


exports.getAll = async (req, res) => {
     await locationModel.find()
          .then((success) => {
               return res.json({
                    status: true,
                    message: "all locations",
                    data: success
               })
          })
          .catch((error) => {
               return res.json({
                    status: true,
                    message: "something went wrong",
                    data: error
               })
          })
}

exports.updateStateData = async (req, res) => {
     const { _id, state, caraIndex, firstPara, secondPara } = req.body;
     
     const idddd = req.params;
   if(!req.files['caraImgLocation'] ){
    
      return res.status(404).json({ msg: 'select image' });
    
   }
   if(!caraIndex )return res.status(404).json({ msg: 'select caraIndex' });
  

     if (caraIndex >= 0 &&    req.files['caraImgLocation']) {
       const displayPhotosCara = req.files['caraImgLocation'].map(file => file.filename);
       console.log("displayPhotosCara:", displayPhotosCara);
       
       try {
          
         const findCara = await locationModel.findOne({ state });
   
         if(findCara.caraImgLocation.length <= (+caraIndex - 1)){
         
          return res.status(404).json({ msg: 'choose correct index of cara' });
     }
         if (!findCara) {
           return res.status(404).json({ msg: 'State not found' });
         }
 
           
         findCara.caraImgLocation.splice(+caraIndex -1 , 1 , displayPhotosCara[0] );
   
         
         const updatedData = await locationModel.findOneAndUpdate(
           { state },
           { state, firstPara, secondPara, caraImgLocation: findCara.caraImgLocation },
           { new: true }
         );
   
         return res.status(200).json({ msg: 'Updated', data: updatedData });
       } catch (error) {
         return res.status(500).json({ msg: 'Error updating data', error: error.message });
       }
     } else {
       try {
         
         const updatedData = await locationModel.findOneAndUpdate(
           { state },
           { state, firstPara, secondPara },
           { new: true }
         );
   
         return res.status(200).json({ msg: 'Updated', data: updatedData });
       } catch (error) {
         return res.status(500).json({ msg: 'Error updating data', error: error.message });
       }
     }
   };
   

   exports.updatelocationData = async (req, res) => {
     const { locationId, state, locationType, locationTitle, locationDescription } = req.body;
   
     try {
       // Find the document by state
       const locationDoc = await locationModel.findOne({ state });
   
       if (!locationDoc) {
         return res.status(404).json({ msg: 'Location not found' });
       }
   
       // Find the specific location object within the exactLocation array by _id
       const location = locationDoc.exactLocation.find(locationn => locationn._id.toString() === locationId);
   
       if (!location) {
         return res.status(404).json({ msg: 'Location not found within the array' });
       }
   
       if (req.files['locationImg'] && req.files['locationImg'].length > 0) {  
          
         const displayPhotosLocation = req.files['locationImg'].map(file => file.filename);
        
         location.locationImg = displayPhotosLocation[0];
       }
   
       if (locationType) {
         location.locationType = locationType;
       }
   
       if (locationTitle) {
         location.locationTitle = locationTitle;
       }
   
       if (locationDescription) {
         location.locationDescription = locationDescription;
       }
   
       // Save the updated document
       await locationDoc.save();
   
       return res.status(200).json({ msg: 'Location updated', data: location });
     } catch (error) {
       return res.status(500).json({ msg: 'Error updating location', error: error.message });
     }
   };
   
         
      
        
          



exports.deleteLocation = async (req, res) => {
     try {
          const { id, state } = req.params; 
          const datas = await locationModel.find({ state: state });
          console.log("191", "datas");
        
          for (const data of datas) {
            for (let index = 0; index < data['exactLocation'].length; index++) {
              const b = data['exactLocation'][index];
              if (b._id.toString() === id) {
                data['exactLocation'].splice(index, 1);
                console.log("if", 'datas1198', index, datas);
                await data.save();
                return res.json({ message: 'Object deleted successfully', data: datas });
              }
            }
          }
          return res.status(400).json({ msg: 'not found' });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ msg: 'Internal server error' });
        }
        
}
exports.delete = async (req, res) => {
     const { id } = req.params

     await locationModel.findByIdAndDelete({ _id: mongoose.Types.ObjectId(id) })
          .then((success) => {
               return res.json({
                    status: true,
                    message: "location deleted successfully",
                    // data: success
               })
          })
          .catch((error) => {
               return res.json({
                    status: true,
                    message: "something went wrong",
                    data: error
               })
          })
}