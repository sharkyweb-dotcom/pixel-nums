import matplotlib.pyplot as plt

import torch
from torchvision import datasets, transforms
from torch.utils.data import DataLoader

import torch.nn.functional as F	

import torch.nn as nn
import torch.optim as optim

# Define the transform - typically you'd at least want to convert the data to a tensor
transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.5,), (0.5,))
])

# Download and load the EMNIST ByClass dataset
train_dataset = datasets.EMNIST(root='./data', split='byclass', train=True, download=True, transform=transform)
test_dataset = datasets.EMNIST(root='./data', split='byclass', train=False, download=True, transform=transform)

# Create data loaders
train_loader = DataLoader(train_dataset, batch_size=64, shuffle=True)
test_loader = DataLoader(test_dataset, batch_size=64, shuffle=False)

# Test by printing the shape of the first batch
# data_iter = iter(train_loader)
# images, labels = data_iter.next()
# print(images.shape)
# print(labels.shape)

out_dim = 62

# Define the CNN model
class CNN(nn.Module):
    def __init__(self):
        super(CNN, self).__init__()
        self.conv1 = nn.Conv2d(1, 32, kernel_size=3, stride=1, padding=1)
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3, stride=1, padding=1)
        self.fc1 = nn.Linear(64*28*28, 128)
        self.fc2 = nn.Linear(128, out_dim)

    def forward(self, x):
        x = torch.relu(self.conv1(x))
        x = torch.relu(self.conv2(x))
        x = x.view(x.size(0), -1)
        x = torch.relu(self.fc1(x))
        x = self.fc2(x)
        return x

class EMNIST_Classifier(nn.Module):
    def __init__(self):
        super(EMNIST_Classifier, self).__init__()
        
        # Define the convolutional layers
        self.conv1 = nn.Conv2d(in_channels=1, out_channels=32, kernel_size=3, stride=1, padding=1)
        self.conv2 = nn.Conv2d(in_channels=32, out_channels=64, kernel_size=3, stride=1, padding=1)
        self.conv3 = nn.Conv2d(in_channels=64, out_channels=128, kernel_size=3, stride=1, padding=1)
        
        # Define the pooling layer (Average pooling)
        self.pool = nn.AvgPool2d(kernel_size=2, stride=2)
        
        # Define the fully connected layers
        self.fc1 = nn.Linear(128 * 3 * 3, 512) 
        self.fc2 = nn.Linear(512, 256)
        self.fc3 = nn.Linear(256, 62) # 62 output classes
        
        # Define the dropout layer
        self.dropout = nn.Dropout(0.5)
        
    def forward(self, x):
        # Convolutional layers with ReLU activation and average pooling
        x = self.pool(F.relu(self.conv1(x)))
        x = self.pool(F.relu(self.conv2(x)))
        x = self.pool(F.relu(self.conv3(x)))
        
        # Flatten the output
        x = x.view(-1, 128 * 3 * 3)
        
        # Fully connected layers with ReLU activation and dropout
        x = F.relu(self.fc1(x))
        x = self.dropout(x)
        
        x = F.relu(self.fc2(x))
        x = self.dropout(x)
        
        x = self.fc3(x) # No activation for the final layer
        
        return x

# model = CNN()
model = EMNIST_Classifier()
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# Training the model
num_epochs = 5

# z_ = 0

for epoch in range(num_epochs):
    print(f"Now opertaing on epoch {epoch}")
    model.train()
    train_loss = 0.0
    correct_train = 0

    for inputs, labels in train_loader:
        
        # if z_ == 0:
            # print("Label:", labels[0])
            # print(inputs[0])

            # image = inputs[0].squeeze().numpy() * 0.5 + 0.5
            # plt.imshow(image, cmap="gray")
            # plt.title(f"Label: {labels[0].item()}")
            # plt.imsave('sample_image_alpha.png', image, cmap="gray")
            # plt.show()

            # z = 1

        optimizer.zero_grad()
        outputs = model(inputs)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()
        train_loss += loss.item()
        _, predicted = outputs.max(1)
        correct_train += predicted.eq(labels).sum().item()

    train_accuracy = 100. * correct_train / len(train_dataset)

    model.eval()
    correct_test = 0
    with torch.no_grad():
        for inputs, labels in test_loader:
            outputs = model(inputs)
            _, predicted = outputs.max(1)
            correct_test += predicted.eq(labels).sum().item()

    test_accuracy = 100. * correct_test / len(test_dataset)

    print(f"Epoch {epoch+1}/{num_epochs}")
    print(f"Training Loss: {train_loss/len(train_loader):.4f}, Training Accuracy: {train_accuracy:.2f}%")
    print(f"Testing Accuracy: {test_accuracy:.2f}%")
    print("-----------------------------")

torch.save(model.state_dict(), 'emnist_cnn_weights_v2.pth')
