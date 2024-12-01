import pandas as pd
import re
from newsrecapis.newscleaning import clean_text
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder

def get_tfidf(X):
    # Use TfidfVectorizer. Output: Vectors for train text.
    vectorizer = TfidfVectorizer(strip_accents='unicode', analyzer='word', ngram_range=(1,2), norm='l2', max_features=50000)
    vectors = vectorizer.fit_transform(X)

    return vectors.toarray()

def encode_labels(y):
    le = LabelEncoder()
    return le.fit_transform(y)

def PrepTrainingData():
    df = pd.read_csv('https://zenodo.org/record/7394851/files/MN-DS-news-classification.csv?download=1')
    print("Preprocessing data...")
    df['combined_categories']= df[['category_level_1', 'category_level_2']].apply(lambda x: ' . '.join(x.astype(str)),axis=1)
    df['text']= df[['title', 'content']].apply(lambda x: ' . '.join(x.astype(str)),axis=1)
    df['text']=df['text'].apply(clean_text)
    print("Data preprocessed...")
    return df