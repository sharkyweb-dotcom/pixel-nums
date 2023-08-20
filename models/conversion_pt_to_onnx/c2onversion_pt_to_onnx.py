from torch import nn
import torch.nn.functional as F
import torch

class CNN(nn.Module):
    def __init__(self):
        super(CNN, self).__init__()
        self.conv1 = nn.Conv2d(1, 32, kernel_size=3, stride=1, padding=1)
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3, stride=1, padding=1)
        self.fc1 = nn.Linear(64*28*28, 128)
        self.fc2 = nn.Linear(128, 10)

    def forward(self, x):
        x = torch.relu(self.conv1(x))
        x = torch.relu(self.conv2(x))
        x = x.view(x.size(0), -1)
        x = torch.relu(self.fc1(x))
        x = self.fc2(x)
        return x

# Load your model
model = CNN()
state_dict = torch.load("C:/Users/richa/test_dir/pixel-nums/models/train_model/mnist_cnn_weights.pth")
model.load_state_dict(state_dict)

model.eval()
# dummy_input = torch.zeros(1, 28,28)
dummy_input = torch.zeros(1,1,28,28)

print("now try to export")
torch.onnx.export(model,dummy_input,'pixel-nums/models/onnx_model.onnx',verbose=True, opset_version=12)
# torch.onnx.export(model, dummy_input, "model.onnx", opset_version=11)
print("successfully converted!!")
#Function to Convert to ONNX 
# def Convert_ONNX(): 

#     # set the model to inference mode 
#     model.eval() 

#     # Let's create a dummy input tensor  
#     dummy_input = torch.randn(1, 1, 28, 28) # , requires_grad=True  

#     # Export the model   
#     torch.onnx.export(model,         # model being run 
#          dummy_input,       # model input (or a tuple for multiple inputs) 
#          "ImageClassifier.onnx",       # where to save the model  
#          export_params=True,  # store the trained parameter weights inside the model file 
#          opset_version=10,    # the ONNX version to export the model to 
#          do_constant_folding=True,  # whether to execute constant folding for optimization 
#          input_names = ['modelInput'],   # the model's input names 
#          output_names = ['modelOutput'], # the model's output names 
#          dynamic_axes={'modelInput' : {0 : 'batch_size'},    # variable length axes 
#                                 'modelOutput' : {0 : 'batch_size'}}) 
#     print(" ") 
#     print('Model has been converted to ONNX')

# Convert_ONNX()
