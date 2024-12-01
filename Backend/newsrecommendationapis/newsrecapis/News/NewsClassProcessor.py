from Backend.newsrecommendationapis.newsrecapis.News.fetchnews import fetch_news_article, get_newsText
from Backend.newsrecommendationapis.newsrecapis.dataprep import get_tfidf
import pickle

def get_newsWithClass_nb():
    model = None

    with open('newsrecapis/MLModels/picklefilesofmodels/nb_model_combinedcat.pkl', 'rb') as f:
        model = pickle.load(f)

    vectorizer = None
    with open("newsrecapis/MLModels/picklefilesofmodels/tfidf_vectorizer.pkl", 'rb') as f:
        vectorizer = pickle.load(f)
    newsArticles = fetch_news_article()
    newsText = get_newsText(newsArticles)

    vectors = vectorizer.transform(newsText['text'])
    predictions = model.predict(vectors)

    for article, prediction in zip(newsArticles, predictions):
        article['prediction'] = prediction

    return newsArticles

def get_newsWithClass_lr():
    model = None

    with open('newsrecapis/MLModels/picklefilesofmodels/lr_model_combinedcat.pkl', 'rb') as f:
        model = pickle.load(f)

    vectorizer = None
    with open("newsrecapis/MLModels/picklefilesofmodels/tfidf_vectorizer.pkl", 'rb') as f:
        vectorizer = pickle.load(f)
    newsArticles = fetch_news_article()
    newsText = get_newsText(newsArticles)

    vectors = vectorizer.transform(newsText['text'])
    predictions = model.predict(vectors)

    for article, prediction in zip(newsArticles, predictions):
        article['prediction'] = prediction

    return newsArticles

def get_newsWithClass_svc():
    model = None

    with open('newsrecapis/MLModels/picklefilesofmodels/svc_model_combinedcat.pkl', 'rb') as f:
        model = pickle.load(f)

    vectorizer = None
    with open("newsrecapis/MLModels/picklefilesofmodels/tfidf_vectorizer.pkl", 'rb') as f:
        vectorizer = pickle.load(f)
    newsArticles = fetch_news_article()
    newsText = get_newsText(newsArticles)

    vectors = vectorizer.transform(newsText['text'])
    predictions = model.predict(vectors)

    for article, prediction in zip(newsArticles, predictions):
        article['prediction'] = prediction

    return newsArticles
