import numpy as np
import pandas as pd
from statsmodels.tsa.api import VAR
from statsmodels.tsa.stattools import adfuller
# import matplotlib.pyplot as plt
# from statsmodels.tsa.stattools import acf


path = "data/bird_migration.csv"

# Read the CSV file into a DataFrame
df = pd.read_csv(path,index_col=False)
df=df.drop(columns=df.columns[0])
df=df.drop(columns=['altitude','device_info_serial','date_time'])

nv=df[df['bird_name']=='Eric']

d1=nv.drop(columns=['bird_name']).dropna()
df = d1

nobs=5939
df_train, df_test = d1[0:-nobs], d1[-nobs:]

def adfuller_test(series, signif=0.05, name='', verbose=False):
    """Perform ADFuller to test for Stationarity of given series and print report"""
    r = adfuller(series, autolag='AIC')
    output = {'test_statistic':round(r[0], 4), 'pvalue':round(r[1], 4), 'n_lags':round(r[2], 4), 'n_obs':r[3]}
    p_value = output['pvalue']
    def adjust(val, length= 6): return str(val).ljust(length)

    # Print Summary
    print(f'    Augmented Dickey-Fuller Test on "{name}"', "\n   ", '-'*47)
    print(f' Null Hypothesis: Data has unit root. Non-Stationary.')
    print(f' Significance Level    = {signif}')
    print(f' Test Statistic        = {output["test_statistic"]}')
    print(f' No. Lags Chosen       = {output["n_lags"]}')

    for key,val in r[4].items():
        print(f' Critical value {adjust(key)} = {round(val, 3)}')

    if p_value <= signif:
        print(f" => P-Value = {p_value}. Rejecting Null Hypothesis.")
        print(f" => Series is Stationary.")
    else:
        print(f" => P-Value = {p_value}. Weak evidence to reject the Null Hypothesis.")
        print(f" => Series is Non-Stationary.")

df_differenced = df_train.diff().dropna()

model = VAR(df_differenced)
for i in [1,2,3,4,5,6,7,8,9]:
    result = model.fit(i)
    print('Lag Order =', i)
    print('AIC : ', result.aic)
    print('BIC : ', result.bic)
    print('FPE : ', result.fpe)
    print('HQIC: ', result.hqic, '\n')

x = model.select_order(maxlags=12)

model_fitted = model.fit(4)

lag_order = model_fitted.k_ar

def invert_transformation(df_train, df_forecast, second_diff=False):
    """Revert back the differencing to get the forecast to original scale."""
    df_fc = df_forecast.copy()
    columns = df_train.columns
    for col in columns:
        # Roll back 2nd Diff
        if second_diff:
            df_fc[str(col)+'_1d'] = (df_train[col].iloc[-1]-df_train[col].iloc[-2]) + df_fc[str(col)+'_2d'].cumsum()
        # Roll back 1st Diff
        df_fc[str(col)+'_forecast'] = df_train[col].iloc[-1] + df_fc[str(col)+'_1d'].cumsum()
        print(df_fc)
    return df_fc

# len(Forecast input) > 4
def generate_prediction(forecast_input):
    # forecast_input = df_differenced.values[-lag_order:]
    forecast_input = np.array(forecast_input)
    print(forecast_input)
    fc = model_fitted.forecast(y=forecast_input, steps=nobs)
    df_forecast = pd.DataFrame(fc, index=df.index[-nobs:], columns=df.columns + '_1d')

    df_results = invert_transformation(df_train, df_forecast, second_diff=False)
    return df_results.loc[:, ['latitude_forecast', 'longitude_forecast','speed_2d_forecast','direction_forecast' ]]
