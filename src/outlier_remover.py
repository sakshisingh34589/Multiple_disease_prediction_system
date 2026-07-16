import numpy as np
import pandas as pd

from sklearn.base import BaseEstimator, TransformerMixin


class OutlierRemover(BaseEstimator, TransformerMixin):

    """
    Custom transformer to replace outliers with NaN
    using the IQR method.
    """

    def __init__(self, factor=1.5):

        self.factor = factor

    def fit(self, X, y=None):

        self.lower_bounds_ = {}
        self.upper_bounds_ = {}

        for column in X.columns:

            Q1 = X[column].quantile(0.25)

            Q3 = X[column].quantile(0.75)

            IQR = Q3 - Q1

            self.lower_bounds_[column] = Q1 - self.factor * IQR

            self.upper_bounds_[column] = Q3 + self.factor * IQR

        return self

    def transform(self, X):

        X = X.copy()

        for column in X.columns:

            lower = self.lower_bounds_[column]

            upper = self.upper_bounds_[column]

            X.loc[
                (X[column] < lower)
                |
                (X[column] > upper),
                column
            ] = np.nan

        return X