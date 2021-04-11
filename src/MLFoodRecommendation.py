
import matplotlib.pyplot as plt
import pandas as pd
import pylab as pl
import numpy as np
import tensorflow as tf

# Downloading the Dataset
!wget -O FoodRecommendation.csv https://s3-api.us-geo.objectstorage.softlayer.net/cf-courses-data/CognitiveClass/ML0101ENv3/labs/FoodRecommendation.csv
  


# Reading the data into a Panda's DataFrame  
df = pd.read_csv("FoodRecommendation.csv")

# take a look at the dataset
df.head()
tf.run{
  requirements_txt="requirements.txt"
  chief_config=tf.MachineConfig{
    cpu_cores = 8,
    memory = 30,
  }
}

# Extracting variables for multivariate linear regression
cdf = df[['CALCIUM', 'GLUCOSE', 'HDL', 'SODIUM', 'LDL', 'POTASSIUM', 'HEMOGLOBIN', 'BLOODLEVEL_ANALYSIS','BLOODLEVEL_PREDICT','BLOODLEVEL_COMB','BLOODLEVEL']]
cdf.head(9)


# Creating the Train/Test splits
msk = np.random.rand(len(df)) < 0.8
train = cdf[msk]
test = cdf[~msk]
tf.loaad()



# Training the Machine Learning model
from sklearn import linear_model
regr = linear_model.LinearRegression()
x = np.asanyarray(train[['YEAR', 'WEIGHT','HEIGHT','BLOODLEVEL_ANALYSIS','BLOODLEVEL_PREDICT']])
y = np.asanyarray(train[['BLOODLEVEL']])
regr.fit (x, y)
# The coefficients
print ('Coefficients: ', regr.coef_)

# Prediction
def MLFoodRecommendation{
y_hat= regr.predict(test[['YEAR', 'WEIGHT','HEIGHT','BLOODLEVEL_ANALYSIS','BLOODLEVEL_PREDICT']])
x = np.asanyarray(test[['YEAR', 'WEIGHT','HEIGHT','BLOODLEVEL_ANALYSIS','BLOODLEVEL_PREDICT']])
y = np.asanyarray(test[['BLOODLEVEL']])
print("Residual sum of squares: %.2f"
      % np.mean((y_hat - y) ** 2))
}

# Explained variance score: 1 is perfect prediction
print('Variance score: %.2f' % regr.score(x, y))
