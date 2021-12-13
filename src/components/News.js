import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
//impt
import PropTypes from 'prop-types'


export class News extends Component {
    apiKey = "ebfbd906995d450291226ee186a8333d"
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: "genral",
    }
    static propsTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    constructor(props) {
        super(props)
        // console.log("Hello I am News Components constructor.")
        this.state = {
            articles: [],
            loading: false,
            page: 0,
            totalResults: 0,
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`
    }

    async updateNews() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parseData = await data.json();
        // console.log(parseData);
        this.setState({ articles: parseData.articles, totalResults: parseData.totalResults, loading: false})
    }

    async componentDidMount() {
        // console.log("componentDidMount function.")
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.apiKey}&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({loading: true});
        // let data = await fetch(url);
        // let parseData =  await data.json();
        // console.log(parseData);
        // this.setState({articles : parseData.articles, totalResults : parseData.totalResults , loading : false,})
        this.setState({ page: 1 });
        this.updateNews();
    }

    handlePrevClick = async () => {
        // console.log("previous");
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading: true});
        // let data = await fetch(url);
        // let parseData =  await data.json();
        // console.log(parseData);
        // this.setState({
        //     page : this.state.page - 1,
        //     articles : parseData.articles,
        //     loading : false,
        // });
        this.setState({ page: this.state.page - 1 });
        this.updateNews();


    }

    handleNextClick = async () => {
        // console.log("next");
        // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/`${this.props.pageSize}`))){
        //     // console.log("running if part.<",Math.ceil(this.state.totalResults/${this.props.pageSize}) );
        // // }else{
        //     // console.log("running else part <", this.state.page+1, ">  < --total limit ", Math.ceil(this.state.totalResults/${this.pageSize}));
        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        //     this.setState({loading: true});
        //     let data = await fetch(url);
        //     let parseData =  await data.json();
        //     // console.log(parseData);
        //     this.setState({
        //         page : this.state.page + 1,
        //         articles : parseData.articles,
        //         loading : false,
        //     })
        // }
        this.setState({ page: this.state.page + 1 });
        this.updateNews();

    }
    render() {
        return (
            <div className="container my-4">
                <h1 className='text-center my-4' style={{ margin: '35px', }}>News-Monkey Top {this.capitalizeFirstLetter(this.props.category)} Headlines.</h1>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage ? element.urlToImage : "https://nypost.com/wp-content/uploads/sites/2/2021/12/newspress-collage-20455872-1639285210953.png?w=1024"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div>
                    })}
                </div>
                <div className="d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / `${this.props.pageSize}`)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News